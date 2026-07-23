<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Konfiguracja logowania administratora oraz powiadomień Discord
$ADMIN_USER = getenv('ADMIN_USER') ?: 'admin';
$ADMIN_PASS = getenv('ADMIN_PASS') ?: 'foundly2026!'; // Możesz zmienić to hasło na własne!
$ADMIN_SECRET_KEY = md5($ADMIN_USER . ':' . $ADMIN_PASS . ':foundly_salt_2026');

$DISCORD_WEBHOOK_URL = getenv('DISCORD_WEBHOOK_URL') ?: 'https://discord.com/api/webhooks/1478104823730802811/GpNCU-mHyBjQNm6OgGX9zZS7qh2Cov61-TRQ4TspNhEkr2FIpr3vu3wFV4bKOrFccY7R';

// Baza danych SQLite w bezpiecznym katalogu
$dbDir = __DIR__ . '/data';
if (!file_exists($dbDir)) {
    @mkdir($dbDir, 0755, true);
}
$dbFile = $dbDir . '/chat.db';

try {
    $pdo = new PDO("sqlite:" . $dbFile);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS chat_sessions (
            session_id TEXT PRIMARY KEY,
            guest_name TEXT,
            guest_email TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS chat_messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            session_id TEXT NOT NULL,
            role TEXT NOT NULL,
            content TEXT NOT NULL,
            user_id TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS form_leads (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            form_title TEXT NOT NULL,
            name TEXT NOT NULL,
            contact TEXT NOT NULL,
            details TEXT,
            notes TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    ");
} catch (Exception $e) {
    echo json_encode(['error' => 'Błąd połączenia z bazą: ' . $e->getMessage()]);
    exit();
}

function sendDiscordEmbed($message, $user, $role, $webhookUrl) {
    if (!$webhookUrl || strpos($webhookUrl, 'http') !== 0) return;

    $color = 0x6366f1;
    if ($role === 'LEAD') $color = 0x10b981; // zielony dla leadu
    if ($role === 'OFFER_VIEW') $color = 0x3b82f6; // niebieski dla odsłony oferty
    if ($role === 'ADMIN') $color = 0x8b5cf6;

    $title = "Powiadomienie Foundly";
    if ($role === 'LEAD') $title = "🎉 NOWA AKCEPTACJA OFERTY / LEAD!";
    if ($role === 'OFFER_VIEW') $title = "👀 Ktoś właśnie przegląda ofertę!";
    if ($role === 'GUEST') $title = "💬 Nowa wiadomość na czacie";

    $payload = json_encode([
        'embeds' => [[
            'title' => $title,
            'description' => $message,
            'color' => $color,
            'fields' => [
                ['name' => 'Klient / Kontakt', 'value' => $user, 'inline' => true],
                ['name' => 'Typ', 'value' => $role, 'inline' => true]
            ],
            'timestamp' => date('c')
        ]]
    ]);

    $ch = curl_init($webhookUrl);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 5);
    curl_exec($ch);
    curl_close($ch);
}

$action = $_GET['action'] ?? '';
$input = json_decode(file_get_contents('php://input'), true) ?? [];

// 0. Logowanie Admina (Login + Hasło)
if ($action === 'login') {
    $user = trim($input['username'] ?? '');
    $pass = trim($input['password'] ?? '');

    if ($user === $ADMIN_USER && $pass === $ADMIN_PASS) {
        echo json_encode(['success' => true, 'token' => $ADMIN_SECRET_KEY, 'user' => $ADMIN_USER]);
    } else {
        http_response_code(401);
        echo json_encode(['error' => 'Nieprawidłowy login lub hasło!']);
    }
    exit();
}

// 1. Pobieranie wiadomości dla danej sesji
if ($action === 'messages') {
    $sessionId = $_GET['sessionId'] ?? '';
    if (!$sessionId) {
        echo json_encode([]);
        exit();
    }

    $stmt = $pdo->prepare("SELECT id, session_id as sessionId, role, content, created_at as createdAt FROM chat_messages WHERE session_id = :sid ORDER BY id ASC");
    $stmt->execute([':sid' => $sessionId]);
    $messages = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($messages);
    exit();
}

// 2. Wysyłanie wiadomości od gościa
if ($action === 'send') {
    $sessionId = trim($input['sessionId'] ?? '');
    $content = trim($input['content'] ?? '');

    if (!$sessionId || !$content) {
        echo json_encode(['error' => 'Brak wymaganych danych']);
        exit();
    }

    $stmt = $pdo->prepare("INSERT INTO chat_sessions (session_id) VALUES (:sid) ON CONFLICT(session_id) DO UPDATE SET updated_at = CURRENT_TIMESTAMP");
    $stmt->execute([':sid' => $sessionId]);

    $stmt = $pdo->prepare("INSERT INTO chat_messages (session_id, role, content) VALUES (:sid, 'GUEST', :content)");
    $stmt->execute([':sid' => $sessionId, ':content' => $content]);

    $stmt = $pdo->prepare("SELECT guest_name, guest_email FROM chat_sessions WHERE session_id = :sid");
    $stmt->execute([':sid' => $sessionId]);
    $sessionInfo = $stmt->fetch(PDO::FETCH_ASSOC);

    $userLabel = !empty($sessionInfo['guest_name']) 
        ? $sessionInfo['guest_name'] . ' (' . ($sessionInfo['guest_email'] ?? 'brak maila') . ')'
        : 'Gość (Sesja: ' . substr($sessionId, -4) . ')';

    sendDiscordEmbed($content, $userLabel, 'GUEST', $DISCORD_WEBHOOK_URL);

    echo json_encode(['success' => true]);
    exit();
}

// 3. Zapis leada czatu
if ($action === 'lead') {
    $sessionId = trim($input['sessionId'] ?? '');
    $name = trim($input['name'] ?? '');
    $email = trim($input['email'] ?? '');

    if (!$sessionId || !$name || !$email) {
        echo json_encode(['error' => 'Brak wymaganych danych']);
        exit();
    }

    $stmt = $pdo->prepare("UPDATE chat_sessions SET guest_name = :name, guest_email = :email, updated_at = CURRENT_TIMESTAMP WHERE session_id = :sid");
    $stmt->execute([':name' => $name, ':email' => $email, ':sid' => $sessionId]);

    sendDiscordEmbed("Pozyskano dane kontaktowe:\nImię: {$name}\nEmail: {$email}", "{$name} ({$email})", 'LEAD', $DISCORD_WEBHOOK_URL);

    echo json_encode(['success' => true]);
    exit();
}

// 4. Powiadomienie o wyświetleniu oferty przez klienta (Offer View Ping)
if ($action === 'offer_view') {
    $client = trim($input['client'] ?? 'Nieznany');
    $email = trim($input['email'] ?? 'Brak');
    $offer = trim($input['offer'] ?? 'Oferta');
    $variant = trim($input['variant'] ?? 'Nie wybrano');

    $msg = "👀 **Klient otworzył formularz akceptacji oferty!**\n• Klient: {$client}\n• Email: {$email}\n• Oferta: {$offer}\n• Domyślny wariant: {$variant}";
    sendDiscordEmbed($msg, "{$client} ({$email})", 'OFFER_VIEW', $DISCORD_WEBHOOK_URL);

    echo json_encode(['success' => true]);
    exit();
}

// 5. Zapis leada akceptacji oferty i powiadomienie Discord
if ($action === 'submit_lead') {
    $name = trim($input['name'] ?? 'Klient');
    $email = trim($input['email'] ?? '');
    $phone = trim($input['phone'] ?? '');
    $offer = trim($input['offer'] ?? '');
    $variant = trim($input['variant'] ?? '');
    $message = trim($input['message'] ?? '');

    $stmt = $pdo->prepare("INSERT INTO form_leads (form_title, name, contact, details, notes) VALUES ('Akceptacja Oferty', :name, :contact, :details, :notes)");
    $stmt->execute([
        ':name' => $name,
        ':contact' => $phone . ($email ? " ({$email})" : ""),
        ':details' => "Wariant: {$variant} | Project: {$offer}",
        ':notes' => $message
    ]);

    $discordMsg = "🎉 **NOWA AKCEPTACJA OFERTY ON-LINE!** 🎉\n\n👤 **Klient:** {$name}\n📞 **Telefon:** {$phone}\n✉️ **Email:** {$email}\n📄 **Oferta:** {$offer}\n⭐ **Wybrany Wariant:** {$variant}";
    sendDiscordEmbed($discordMsg, "{$name} ({$phone})", 'LEAD', $DISCORD_WEBHOOK_URL);

    echo json_encode(['success' => true]);
    exit();
}

// 6. Zapis leada z ogólnego formularza na stronie
if ($action === 'save_form_lead') {
    $title = trim($input['formTitle'] ?? 'Formularz');
    $name = trim($input['name'] ?? '');
    $contact = trim($input['contact'] ?? '');
    $details = trim($input['details'] ?? '');
    $notes = trim($input['notes'] ?? '');

    $stmt = $pdo->prepare("INSERT INTO form_leads (form_title, name, contact, details, notes) VALUES (:title, :name, :contact, :details, :notes)");
    $stmt->execute([':title' => $title, ':name' => $name, ':contact' => $contact, ':details' => $details, ':notes' => $notes]);

    sendDiscordEmbed("Zgłoszenie z formularza [{$title}]:\nImię: {$name}\nKontakt: {$contact}\nSzczegóły: {$details}", "{$name} ({$contact})", 'LEAD', $DISCORD_WEBHOOK_URL);

    echo json_encode(['success' => true]);
    exit();
}

// 5. Panel Admina - Lista sesji czatów
if ($action === 'admin_sessions') {
    $token = $_GET['token'] ?? '';
    if ($token !== $ADMIN_SECRET_KEY) {
        http_response_code(401);
        echo json_encode(['error' => 'Brak dostępu']);
        exit();
    }

    $stmt = $pdo->query("
        SELECT 
            s.session_id as sessionId,
            s.guest_name as guestName,
            s.guest_email as guestEmail,
            s.updated_at as lastActivity,
            (SELECT content FROM chat_messages m WHERE m.session_id = s.session_id ORDER BY m.id DESC LIMIT 1) as lastMessage,
            (SELECT role FROM chat_messages m WHERE m.session_id = s.session_id ORDER BY m.id DESC LIMIT 1) as lastRole
        FROM chat_sessions s
        ORDER BY s.updated_at DESC
    ");
    $sessions = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['sessions' => $sessions]);
    exit();
}

// 6. Panel Admina - Lista leadów z formularzy
if ($action === 'admin_leads') {
    $token = $_GET['token'] ?? '';
    if ($token !== $ADMIN_SECRET_KEY) {
        http_response_code(401);
        echo json_encode(['error' => 'Brak dostępu']);
        exit();
    }

    $stmt = $pdo->query("SELECT id, form_title as formTitle, name, contact, details, notes, created_at as createdAt FROM form_leads ORDER BY id DESC");
    $leads = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['leads' => $leads]);
    exit();
}

// 7. Panel Admina - Odpowiedź administratora
if ($action === 'admin_reply') {
    $token = $input['token'] ?? '';
    $sessionId = $input['sessionId'] ?? '';
    $content = $input['content'] ?? '';

    if ($token !== $ADMIN_SECRET_KEY || !$sessionId || !$content) {
        http_response_code(401);
        echo json_encode(['error' => 'Brak uprawnień lub poprawnych danych']);
        exit();
    }

    $stmt = $pdo->prepare("INSERT INTO chat_messages (session_id, role, content) VALUES (:sid, 'ADMIN', :content)");
    $stmt->execute([':sid' => $sessionId, ':content' => $content]);

    $stmt = $pdo->prepare("SELECT guest_name, guest_email FROM chat_sessions WHERE session_id = :sid");
    $stmt->execute([':sid' => $sessionId]);
    $sessionInfo = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!empty($sessionInfo['guest_email'])) {
        $to = $sessionInfo['guest_email'];
        $subject = "Nowa wiadomość od Foundly Agencja";
        $body = "Cześć " . htmlspecialchars($sessionInfo['guest_name'] ?? 'Gość') . ",\n\nAdministrator odpowiedział na Twoją wiadomość w czacie:\n\"" . $content . "\"\n\nWejdź na naszą stronę, aby kontynuować rozmowę.";
        $headers = "From: no-reply@foundly.pl\r\nContent-Type: text/plain; charset=UTF-8";
        @mail($to, $subject, $body, $headers);
    }

    echo json_encode(['success' => true]);
    exit();
}

echo json_encode(['error' => 'Nieznana akcja']);
