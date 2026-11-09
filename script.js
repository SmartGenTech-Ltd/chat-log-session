/* ==========================================================================
   WHATSAPP BUSINESS CLONE - SCRIPT COMPLET ET INTÉGRAL (V5.0 - FINAL)
   ========================================================================== */

const chatView = document.getElementById('chatView');
const homeView = document.getElementById('homeView');
const plusBtn = document.getElementById('plusBtn');
const plusMenu = document.getElementById('plusMenu');
const emojiToggleBtn = document.getElementById('emojiToggleBtn');
const emojiPicker = document.getElementById('emojiPicker');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const chatMessages = document.getElementById('chatMessages');
const contextMenu = document.getElementById('contextMenu');
const callScreen = document.getElementById('callScreen');
const replyPreview = document.getElementById('replyPreview');
const replyText = document.getElementById('replyText');
const subPanel = document.getElementById('subPanel');
const subPanelTitle = document.getElementById('subPanelTitle');
const subPanelBody = document.getElementById('subPanelBody');

let selectedMessage = null;
let idReplying = false;

/* --------------------------------------------------------------------------
   1. NAVIGATION PRINCIPALE & ONGLETS
   -------------------------------------------------------------------------- */

function goToHomeView() {
    chatView.classList.remove('active');
    homeView.classList.add('active');
    closeSubPanel();
}

function openChatSession() {
    homeView.classList.remove('active');
    chatView.classList.add('active');
}

/* ==========================================================================
   ROUTEUR DES ONGLETS DU BAS (SWITCH TAB CORRIGÉ ET INTÉGRAL)
   ========================================================================== */

function switchTab(tabName, titleText, element = null) {
    // 1. Gestion de la classe active sur les éléments de la barre de navigation
    const navItems = document.querySelectorAll('.bottom-nav .nav-item, .bottom-nav div');
    navItems.forEach(item => item.classList.remove('active'));
    
    if (element) {
        element.classList.add('active');
    } else if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }
    
    // 2. Mise à jour du titre de l'en-tête principal
    const titleEl = document.getElementById('homeTitle');
    if (titleEl) titleEl.textContent = titleText;
    
    const content = document.getElementById('homeContent');
    if (!content) return;
    
    closeSubPanel();

    // 3. Routage des contenus selon l'onglet cliqué
    if (tabName === 'chats') {
        content.innerHTML = `
            <div class="search-box" style="padding: 10px;"><input type="text" placeholder="Search chats" style="width:100%; padding:8px; border-radius:8px; border:1px solid #ccc;"></div>
            <div class="chat-list-item" onclick="openChatSession()" style="display:flex; align-items:center; padding:12px; cursor:pointer; border-bottom:1px solid #f0f2f5;">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" alt="Pharmacien" id="sidebarAvatar" style="width:50px; height:50px; border-radius:50%; object-fit:cover; margin-right:15px;">
                <div class="chat-info" style="flex:1;">
                    <div class="chat-name-row" style="display:flex; justify-content:space-between; font-weight:bold;"><h3>Pharmacien</h3><span class="chat-time" style="font-size:12px; color:#667781;">10:12</span></div>
                    <p class="chat-snippet" style="font-size:13px; color:#667781; margin:0;">Catalogue mis à jour avec succès ✅</p>
                </div>
            </div>`;
    } 
    else if (tabName === 'status' || tabName === 'updates') {
        content.innerHTML = `
            <div style="padding: 15px; background: #fff; height: 100%;">
                <h3 style="font-size: 22px; font-weight: bold; margin-bottom: 15px; color: #111;">Status</h3>
                
                <div style="display: flex; gap: 12px; overflow-x: auto; padding-bottom: 15px; margin-bottom: 20px;">
                    <div style="min-width: 75px; text-align: center; cursor: pointer;" onclick="postNewStatus()">
                        <div style="position: relative; width: 70px; height: 70px; border-radius: 50%; background: #f0f2f5; display: flex; align-items: center; justify-content: center; margin: 0 auto 6px auto; border: 2px dashed #008069;">
                            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" alt="Me" style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover;">
                            <div style="position: absolute; bottom: 0; right: 0; background: #008069; color: white; width: 20px; height: 20px; border-radius: 50%; font-size: 14px; display: flex; align-items: center; justify-content: center; border: 2px solid white;">+</div>
                        </div>
                        <span style="font-size: 12px; font-weight: 500; color: #111;">Add status</span>
                    </div>

                    <div style="min-width: 75px; text-align: center; cursor: pointer;" onclick="alert('Affichage du statut de Bertino')">
                        <div style="width: 70px; height: 70px; border-radius: 50%; padding: 2px; border: 3px solid #008069; margin: 0 auto 6px auto;">
                            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" alt="Bertino" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">
                        </div>
                        <span style="font-size: 12px; color: #111; display: block;">Bertino</span>
                    </div>

                    <div style="min-width: 75px; text-align: center; cursor: pointer;" onclick="alert('Affichage du statut de Sønë')">
                        <div style="width: 70px; height: 70px; border-radius: 50%; padding: 2px; border: 3px solid #008069; margin: 0 auto 6px auto;">
                            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100" alt="Sønë" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">
                        </div>
                        <span style="font-size: 12px; color: #111; display: block;">Sønë</span>
                    </div>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <h3 style="font-size: 18px; font-weight: bold; color: #111;">Channels</h3>
                    <button onclick="alert('Exploration des canaux en ligne')" style="background: #f0f2f5; border: none; padding: 6px 14px; border-radius: 15px; font-weight: 600; cursor: pointer; color: #008069;">Explore</button>
                </div>

                <div class="chat-list-item" style="display:flex; align-items:center; padding:12px 0; border-bottom: 1px solid #f0f2f5;" onclick="alert('Ouverture du canal Père Étienne')">
                    <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100" alt="Channel" style="width:50px; height:50px; border-radius:50%; object-fit:cover; margin-right:15px;">
                    <div class="chat-info" style="flex:1;">
                        <div class="chat-name-row" style="display:flex; justify-content:space-between; font-weight:bold;"><h3 style="font-size:15px; margin:0;">Père Étienne NEMI, CSSp</h3><span style="font-size:12px; color:#667781;">Yesterday</span></div>
                        <p class="chat-snippet" style="font-size:13px; color: #667781; margin:0;">📷 Photo</p>
                    </div>
                    <span style="background: #008069; color: white; border-radius: 50%; padding: 2px 6px; font-size: 11px; font-weight: bold;">47</span>
                </div>

                <div class="chat-list-item" style="display:flex; align-items:center; padding:12px 0;" onclick="alert('Ouverture du canal AEFMSB')">
                    <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100" alt="Channel" style="width:50px; height:50px; border-radius:50%; object-fit:cover; margin-right:15px;">
                    <div class="chat-info" style="flex:1;">
                        <div class="chat-name-row" style="display:flex; justify-content:space-between; font-weight:bold;"><h3 style="font-size:15px; margin:0;">AEFMSB-UY1</h3><span style="font-size:12px; color:#667781;">8/20/26</span></div>
                        <p class="chat-snippet" style="font-size:13px; color: #667781; margin:0;">Hey les docs ✊🏿 C'est avec une tristesse...</p>
                    </div>
                    <span style="background: #008069; color: white; border-radius: 50%; padding: 2px 6px; font-size: 11px; font-weight: bold;">3</span>
                </div>
            </div>`;
    }
    else if (tabName === 'calls') {
        content.innerHTML = `
            <div style="padding: 15px;">
                <h3 style="font-size: 20px; font-weight: bold; margin-bottom: 15px;">Recent Calls</h3>
                <div style="display:flex; align-items:center; padding:10px 0; border-bottom:1px solid #f0f2f5;">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" alt="Call" style="width:50px; height:50px; border-radius:50%; object-fit:cover; margin-right:15px;">
                    <div style="flex:1;">
                        <b>Pharmacien</b><br><small style="color:#ea0038;">↙ Incoming audio call (Missed)</small>
                    </div>
                    <button onclick="startCall('audio')" style="background:none; border:none; font-size:20px; cursor:pointer;">📞</button>
                </div>
            </div>`;
    }
    else if (tabName === 'tools') {
        content.innerHTML = `
            <div style="padding: 15px;">
                <h3 style="font-size: 20px; font-weight: bold; margin-bottom: 15px;">Business Tools</h3>
                <div class="setting-item" onclick="openSettingDetail('Business tools', 'tools')" style="padding:12px; background:white; margin-bottom:8px; border-radius:8px; cursor:pointer; display:flex; align-items:center;">
                    <span style="font-size:20px; margin-right:15px;">🛍️</span><div><b>Catalog & Products</b><br><small style="color:#667781">Manage your professional store items</small></div>
                </div>
                <div class="setting-item" onclick="openSettingDetail('Business tools', 'tools')" style="padding:12px; background:white; margin-bottom:8px; border-radius:8px; cursor:pointer; display:flex; align-items:center;">
                    <span style="font-size:20px; margin-right:15px;">⚡</span><div><b>Quick Replies</b><br><small style="color:#667781">Reusable text shortcuts for customers</small></div>
                </div>
            </div>`;
    }
    else if (tabName === 'settings') {
        content.innerHTML = `
            <div class="settings-header" onclick="openSettingDetail('Account', 'account')" style="display:flex; align-items:center; padding:15px; background:white; border-bottom:1px solid #f0f2f5; cursor:pointer;">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" alt="Avatar" id="settingsMainAvatar" style="width:60px; height:60px; border-radius:50%; object-fit:cover; margin-right:15px;">
                <div>
                    <h2 style="font-size: 18px; color: #111; margin:0;">Pharmacien</h2>
                    <p style="color: #667781; font-size: 14px; margin:2px 0 0 0;">Business Account</p>
                </div>
            </div>
            <div class="settings-list" style="background:#fff;">
                <div class="setting-item" onclick="openSettingDetail('Business tools', 'tools')" style="display:flex; align-items:center; padding:12px 15px; border-bottom:1px solid #f0f2f5; cursor:pointer;"><span style="font-size:20px; margin-right:15px;">🛍️</span> <div style="flex:1;"><b>Business tools</b><br><small style="color:#667781">Profile, catalog, messaging tools</small></div></div>
                <div class="setting-item" onclick="openSettingDetail('Account', 'account')" style="display:flex; align-items:center; padding:12px 15px; border-bottom:1px solid #f0f2f5; cursor:pointer;"><span style="font-size:20px; margin-right:15px;">🔑</span> <div style="flex:1;"><b>Account</b><br><small style="color:#667781">Security notifications, change number</small></div></div>
                <div class="setting-item" onclick="openSettingDetail('Privacy', 'privacy')" style="display:flex; align-items:center; padding:12px 15px; border-bottom:1px solid #f0f2f5; cursor:pointer;"><span style="font-size:20px; margin-right:15px;">🔒</span> <div style="flex:1;"><b>Privacy</b><br><small style="color:#667781">Block contacts, disappearing messages</small></div></div>
                <div class="setting-item" onclick="openSettingDetail('Avatar', 'avatar')" style="display:flex; align-items:center; padding:12px 15px; border-bottom:1px solid #f0f2f5; cursor:pointer;"><span style="font-size:20px; margin-right:15px;">🙂</span> <div style="flex:1;"><b>Avatar</b><br><small style="color:#667781">Create, edit, profile photo from machine</small></div></div>
                <div class="setting-item" onclick="openSettingDetail('Chats', 'chats_settings')" style="display:flex; align-items:center; padding:12px 15px; border-bottom:1px solid #f0f2f5; cursor:pointer;"><span style="font-size:20px; margin-right:15px;">💬</span> <div style="flex:1;"><b>Chats</b><br><small style="color:#667781">Theme, wallpapers, chat history</small></div></div>
                <div class="setting-item" onclick="openSettingDetail('Notifications', 'notifications')" style="display:flex; align-items:center; padding:12px 15px; border-bottom:1px solid #f0f2f5; cursor:pointer;"><span style="font-size:20px; margin-right:15px;">🔔</span> <div style="flex:1;"><b>Notifications</b><br><small style="color:#667781">Message, group & call tones</small></div></div>
                <div class="setting-item" onclick="openSettingDetail('Storage and data', 'storage')" style="display:flex; align-items:center; padding:12px 15px; border-bottom:1px solid #f0f2f5; cursor:pointer;"><span style="font-size:20px; margin-right:15px;">💾</span> <div style="flex:1;"><b>Storage and data</b><br><small style="color:#667781">Network usage, auto-download</small></div></div>
                <div class="setting-item" onclick="openSettingDetail('Privacy Policy', 'policy')" style="display:flex; align-items:center; padding:12px 15px; cursor:pointer;"><span style="font-size:20px; margin-right:15px;">📄</span> <div style="flex:1;"><b>Privacy Policy</b><br><small style="color:#667781">Terms and legal compliance</small></div></div>
            </div>`;
    }
}

/* --------------------------------------------------------------------------
   2. GESTION DES SOUS-MENUS PARAMÈTRES
   -------------------------------------------------------------------------- */

function openSettingDetail(title, type) {
    subPanelTitle.textContent = title;
    subPanel.classList.add('active');

    if (type === 'privacy') {
        subPanelBody.innerHTML = `
            <div style="font-size: 13px; color: #667781; padding: 10px 15px;">Who can see my personal info</div>
            <div class="setting-section">
                <div class="setting-row" onclick="openSubRadioMenu('Last seen & online', ['Everyone', 'My contacts', 'My contacts except...', 'Nobody'], 'Nobody', 'privacy')"><span>Last seen & online</span> <span class="val">Nobody &gt;</span></div>
                <div class="setting-row" onclick="openSubRadioMenu('Profile picture', ['Everyone', 'My contacts', 'My contacts except...', 'Nobody'], 'Everyone', 'privacy')"><span>Profile picture</span> <span class="val">Everyone &gt;</span></div>
                <div class="setting-row" onclick="openSubRadioMenu('About', ['Everyone', 'My contacts', 'My contacts except...', 'Nobody'], 'Everyone', 'privacy')"><span>About</span> <span class="val">Everyone &gt;</span></div>
                <div class="setting-row" onclick="openSubRadioMenu('Status', ['Everyone', 'My contacts', 'My contacts except...', 'Only share with...'], 'My contacts', 'privacy')"><span>Status</span> <span class="val">My contacts &gt;</span></div>
            </div>
            <div class="setting-section">
                <div class="setting-row"><span>Read receipts</span> <label class="switch"><input type="checkbox" checked><span class="slider"></span></label></div>
            </div>
            <div class="setting-section">
                <div class="setting-row" onclick="alert('Disappearing messages config')"><span>Default timer</span> <span class="val">Off &gt;</span></div>
                <div class="setting-row" onclick="alert('Chats verrouillés sécurisés')"><span>Chat lock</span> <span class="val">&gt;</span></div>
            </div>`;
    } 
    else if (type === 'tools') {
        subPanelBody.innerHTML = `
            <div class="setting-section">
                <div class="setting-row" onclick="alert('Business profile edition module')"><span>Business Profile</span> <span class="val">&gt;</span></div>
                <div class="setting-row" onclick="alert('Catalogue de produits ouvert')"><span>Catalog</span> <span class="val">&gt;</span></div>
                <div class="setting-row" onclick="openSubRadioMenu('Away message rules', ['Always send', 'Custom schedule', 'Outside business hours'], 'Outside business hours', 'tools')"><span>Away message</span> <span class="val">&gt;</span></div>
                <div class="setting-row" onclick="alert('Message d accueil configuré')"><span>Greeting message</span> <span class="val">&gt;</span></div>
                <div class="setting-row" onclick="alert('Gestion des labels')"><span>Labels</span> <span class="val">&gt;</span></div>
                <div class="setting-row" onclick="alert('Lien court professionnel généré')"><span>Short link</span> <span class="val">&gt;</span></div>
            </div>`;
    }
    else if (type === 'account') {
        subPanelBody.innerHTML = `
            <div class="setting-section">
                <div class="setting-row" onclick="alert('Security notifications toggled')"><span>Security notifications</span> <span class="val">&gt;</span></div>
                <div class="setting-row" onclick="alert('Passkeys management')"><span>Passkeys</span> <span class="val">&gt;</span></div>
                <div class="setting-row" onclick="alert('Email address linked')"><span>Email address</span> <span class="val">&gt;</span></div>
                <div class="setting-row" onclick="alert('Two-step verification active')"><span>Two-step verification</span> <span class="val">&gt;</span></div>
            </div>
            <div class="setting-section">
                <div class="setting-row" onclick="alert('Migration de numéro de téléphone')"><span>Change number</span> <span class="val">&gt;</span></div>
                <div class="setting-row" onclick="confirm('Attention : Voulez-vous vraiment supprimer votre compte ?')" style="color:#ea0038;"><span>Delete account</span> <span class="val">&gt;</span></div>
            </div>`;
    }
    else if (type === 'avatar') {
        subPanelBody.innerHTML = `
            <div class="setting-section" style="text-align:center; padding: 25px;">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200" alt="Profile" id="previewProfileImg" style="width:110px; height:110px; border-radius:50%; object-fit:cover; margin-bottom:15px; cursor:pointer; box-shadow:0 4px 10px rgba(0,0,0,0.2);" onclick="triggerFileInput();">
                <p style="font-size:14px; color:#667781; margin-bottom:15px; font-weight:500;">Clique sur l'image ou le bouton pour importer une photo depuis ta machine</p>
                <button onclick="triggerFileInput()" style="background:#008069; color:white; border:none; padding:10px 24px; border-radius:24px; font-weight:bold; cursor:pointer;">📁 Choisir un fichier</button>
            </div>`;
    }
    else if (type === 'chats_settings') {
        subPanelBody.innerHTML = `
            <div class="setting-section">
                <div class="setting-row" onclick="openSubRadioMenu('Theme selection', ['System default', 'Dark', 'Light'], 'Light', 'chats_settings')"><span>Theme</span> <span class="val">Light &gt;</span></div>
                <div class="setting-row" onclick="alert('Wallpaper picker ouvert')"><span>Wallpaper</span> <span class="val">&gt;</span></div>
                <div class="setting-row"><span>Enter is send</span> <label class="switch"><input type="checkbox" checked><span class="slider"></span></label></div>
                <div class="setting-row"><span>Save to Photos</span> <label class="switch"><input type="checkbox" checked><span class="slider"></span></label></div>
                <div class="setting-row"><span>Sticker suggestions</span> <label class="switch"><input type="checkbox" checked><span class="slider"></span></label></div>
            </div>
            <div class="setting-section">
                <div class="setting-row" onclick="clearAllMessagesInChat()"><span>Clear all chats</span> <span class="val" style="color:#ea0038;">🗑️</span></div>
                <div class="setting-row" onclick="alert('Exportation de discussion en cours')"><span>Export chat</span> <span class="val">&gt;</span></div>
            </div>`;
    }
    else if (type === 'notifications') {
        subPanelBody.innerHTML = `
            <div class="setting-section">
                <div class="setting-row"><span>Conversation tones</span> <label class="switch"><input type="checkbox" checked><span class="slider"></span></label></div>
                <div class="setting-row" onclick="alert('Notification tone picker')"><span>Notification tone</span> <span class="val">Note &gt;</span></div>
                <div class="setting-row" onclick="alert('Vibration configuration')"><span>Vibrate</span> <span class="val">Default &gt;</span></div>
                <div class="setting-row" onclick="alert('Popup notification config')"><span>Popup notification</span> <span class="val">No popup &gt;</span></div>
                <div class="setting-row" onclick="alert('Light setting')"><span>Light</span> <span class="val">White &gt;</span></div>
            </div>`;
    }
    else if (type === 'storage') {
        subPanelBody.innerHTML = `
            <div class="setting-section">
                <div class="setting-row" onclick="alert('Gestionnaire de stockage des fichiers')"><span>Manage storage</span> <span class="val">&gt;</span></div>
                <div class="setting-row" onclick="alert('Statistiques de trafic réseau')"><span>Network usage</span> <span class="val">&gt;</span></div>
            </div>
            <div class="setting-section">
                <div class="setting-row" onclick="openSubRadioMenu('Photos auto-download', ['Wi-Fi', 'Cellular', 'Never'], 'Wi-Fi', 'storage')"><span>Photos</span> <span class="val">Wi-Fi &gt;</span></div>
                <div class="setting-row" onclick="openSubRadioMenu('Audio auto-download', ['Wi-Fi', 'Cellular', 'Never'], 'Wi-Fi', 'storage')"><span>Audio</span> <span class="val">Wi-Fi &gt;</span></div>
                <div class="setting-row" onclick="openSubRadioMenu('Videos auto-download', ['Wi-Fi', 'Cellular', 'Never'], 'Never', 'storage')"><span>Videos</span> <span class="val">Never &gt;</span></div>
                <div class="setting-row" onclick="openSubRadioMenu('Documents auto-download', ['Wi-Fi', 'Cellular', 'Never'], 'Never', 'storage')"><span>Documents</span> <span class="val">Never &gt;</span></div>
            </div>
            <div class="setting-section">
                <div class="setting-row"><span>Use less data for calls</span> <label class="switch"><input type="checkbox"><span class="slider"></span></label></div>
            </div>`;
    }
    else if (type === 'policy') {
        subPanelBody.innerHTML = `
            <div class="setting-section" style="padding:15px; font-size:14px; color:#374151; line-height:1.6;">
                <h3 style="color:#008069; margin-bottom:10px;">Privacy Policy & Terms</h3>
                <p>Welcome to our WhatsApp Business Clone application. We respect your privacy and are committed to protecting your personal data.</p>
                <p style="margin-top:10px;"><b>1. Data Collection:</b> We collect local configuration inputs and media files strictly for session interaction simulation.</p>
                <p style="margin-top:10px;"><b>2. Security:</b> End-to-end local storage encryption standards apply to simulated chats.</p>
                <p style="margin-top:10px;"><b>3. Compliance:</b> Built for academic software engineering defense requirements.</p>
            </div>`;
    }
}

function openSubRadioMenu(title, options, selectedOption, parentType) {
    subPanelTitle.textContent = title;
    let html = `<div style="font-size: 13px; color: #667781; padding: 5px 15px 10px 15px;">Configuration for ${title}</div><div class="setting-section">`;
    options.forEach(opt => {
        const isChecked = opt === selectedOption ? '<span style="color:#008069; font-weight:bold; font-size:16px;">✓</span>' : '';
        html += `<div class="setting-row" onclick="selectRadioOption('${title}', '${options.join(",")}', '${opt}', '${parentType}')"><span>${opt}</span> ${isChecked}</div>`;
    });
    html += `</div>`;
    subPanelBody.innerHTML = html;
}

function selectRadioOption(menuTitle, optionsListStr, chosenOpt, parentType) {
    openSubRadioMenu(menuTitle, optionsListStr.split(','), chosenOpt, parentType);
}

function triggerFileInput() {
    let fileInput = document.getElementById('profilePicInput');
    if (!fileInput) {
        fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.id = 'profilePicInput';
        fileInput.style.display = 'none';
        fileInput.accept = 'image/*';
        fileInput.onchange = function() { handleProfilePicSelected(this); };
        document.body.appendChild(fileInput);
    }
    fileInput.click();
}

function handleProfilePicSelected(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageUrl = e.target.result;
            const mainAvatar = document.getElementById('settingsMainAvatar');
            const sidebarAvatar = document.getElementById('sidebarAvatar');
            const previewImg = document.getElementById('previewProfileImg');
            if (mainAvatar) mainAvatar.src = imageUrl;
            if (sidebarAvatar) sidebarAvatar.src = imageUrl;
            if (previewImg) previewImg.src = imageUrl;
            alert("📸 Photo de profil mise à jour depuis la machine avec succès !");
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function closeSubPanel() {
    subPanel.classList.remove('active');
}

function postNewStatus() {
    const statusText = prompt("Entrez le texte de votre nouveau statut WhatsApp :");
    if (statusText) {
        alert(`✨ Statut publié avec succès : "${statusText}"`);
    }
}

function triggerAction(actionName) {
    plusMenu.classList.remove('active');

    if (actionName === 'camera') {
        const camInput = document.getElementById('cameraInput') || createHiddenInput('cameraInput', 'image/*;capture=camera');
        camInput.click();
    } 
    else if (actionName === 'photos' || actionName === 'gallery') {
        const galInput = document.getElementById('galleryInput') || createHiddenInput('galleryInput', 'image/*');
        galInput.click();
    } 
    else if (actionName === 'document') {
        const docInput = document.getElementById('docInput') || createHiddenInput('docInput', '.pdf,.doc,.docx,.txt');
        docInput.click();
    } 
    else if (actionName === 'location') {
        alert("📍 Partage de position en cours... (Position GPS simulée envoyée dans le chat)");
        appendSystemMessage("📍 [Position géographique partagée]");
    } 
    else if (actionName === 'contact') {
        alert("📇 Module de partage de contact ouvert.");
        appendSystemMessage("📇 [Contact partagé : Pharmacien Support]");
    } 
    else if (actionName === 'catalog') {
        alert("🛍️ Ouverture du catalogue de produits professionnels.");
    } 
    else if (actionName === 'quick_replies' || actionName === 'quick replies') {
        alert("⚡ Gestion des réponses rapides professionnelles.");
    } 
    else if (actionName === 'poll') {
        const question = prompt("Créer un sondage - Entrez la question :");
        if (question) {
            appendSystemMessage(`📊 [Sondage] ${question}`);
        }
    } 
    else if (actionName === 'event') {
        alert("📅 Planification d'un événement ou d'un rendez-vous professionnel.");
    } 
    else {
        alert(`Module [${actionName}] ouvert avec succès.`);
    }
}

function createHiddenInput(id, acceptType) {
    const inp = document.createElement('input');
    inp.type = 'file';
    inp.id = id;
    inp.style.display = 'none';
    inp.accept = acceptType;
    inp.onchange = function(e) {
        if (e.target.files && e.target.files[0]) {
            appendSystemMessage(`📎 [Fichier envoyé : ${e.target.files[0].name}]`);
        }
    };
    document.body.appendChild(inp);
    return inp;
}

function appendSystemMessage(text) {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message');
    msgDiv.style.alignSelf = 'flex-end';
    msgDiv.style.backgroundColor = '#d9fdd3';
    msgDiv.innerHTML = `<span class="message-text">${text}</span> <span class="time">${timeNow} ✓✓</span>`;
    msgDiv.addEventListener('click', (e) => {
        e.stopPropagation();
        openContextMenu(e, msgDiv);
    });
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function startCall(type) {
    const titleEl = document.getElementById('callTitle');
    if (titleEl) {
        titleEl.textContent = type === 'video' ? "Appel vidéo en cours..." : "Appel audio en cours...";
    }
    if (callScreen) {
        callScreen.style.display = 'flex';
    } else {
        alert(type === 'video' ? "📹 Appel vidéo lancé !" : "📞 Appel audio lancé !");
    }
}

function endCall() {
    if (callScreen) {
        callScreen.style.display = 'none';
    }
}

messageInput.addEventListener('input', () => {
    sendBtn.textContent = messageInput.value.trim().length > 0 ? "➤" : "🎤";
});

plusBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    plusMenu.classList.toggle('active');
    emojiPicker.classList.remove('active');
    closeContextMenu();
});

emojiToggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    emojiPicker.classList.toggle('active');
    plusMenu.classList.remove('active');
    closeContextMenu();
});

document.addEventListener('click', () => {
    plusMenu.classList.remove('active');
    emojiPicker.classList.remove('active');
    closeContextMenu();
});

plusMenu.addEventListener('click', (e) => e.stopPropagation());
emojiPicker.addEventListener('click', (e) => e.stopPropagation());
contextMenu.addEventListener('click', (e) => e.stopPropagation());

function sendMessage() {
    const text = messageInput.value.trim();
    if (text === "") return;
    appendSystemMessage(text);
    messageInput.value = "";
    sendBtn.textContent = "🎤";
}

sendBtn.addEventListener('click', () => {
    if (messageInput.value.trim() !== "") {
        sendMessage();
    } else {
        alert("🎤 Enregistrement vocal simulé et envoyé dans la conversation !");
        appendSystemMessage("🎤 [Message vocal - 0:04]");
    }
});

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

function openContextMenu(e, msgElement) {
    selectedMessage = msgElement;
    contextMenu.style.display = 'block';
    let x = e.clientX;
    let y = e.clientY;
    if (x + 240 > window.innerWidth) x = window.innerWidth - 250;
    if (y + 380 > window.innerHeight) y = window.innerHeight - 390;
    contextMenu.style.left = x + 'px';
    contextMenu.style.top = y + 'px';
    plusMenu.classList.remove('active');
    emojiPicker.classList.remove('active');
}

function closeContextMenu() { contextMenu.style.display = 'none'; }

function addReaction(emoji) {
    if (selectedMessage) {
        const existingBadge = selectedMessage.querySelector('.reaction-badge');
        if (existingBadge) existingBadge.remove();
        const badge = document.createElement('div');
        badge.className = 'reaction-badge';
        badge.textContent = emoji;
        selectedMessage.appendChild(badge);
    }
    closeContextMenu();
}

function openEmojiPickerFromMenu() { closeContextMenu(); emojiPicker.classList.add('active'); }
function replyMessage() {
    if (selectedMessage) {
        const textElement = selectedMessage.querySelector('.message-text');
        replyText.textContent = textElement ? textElement.textContent : "Média";
        replyPreview.style.display = 'flex';
        idReplying = true;
        messageInput.focus();
    }
    closeContextMenu();
}
function cancelReply() { replyPreview.style.display = 'none'; idReplying = false; replyText.textContent = ""; }
function forwardMessage() { alert("➡️ Message transféré."); closeContextMenu(); }
function copyMessageText() {
    if (selectedMessage) {
        const textElement = selectedMessage.querySelector('.message-text');
        if (textElement) navigator.clipboard.writeText(textElement.textContent).then(() => alert("📋 Texte copié !"));
    }
    closeContextMenu();
}
function editMessage() {
    if (selectedMessage) {
        const textElement = selectedMessage.querySelector('.message-text');
        if (textElement) {
            messageInput.value = textElement.textContent;
            messageInput.focus();
            sendBtn.textContent = "➤";
            selectedMessage.remove();
        }
    }
    closeContextMenu();
}
function deleteSelectedMessage() {
    if (selectedMessage) {
        selectedMessage.remove();
        selectedMessage = null;
    }
    closeContextMenu();
}
function clearAllMessagesInChat() {
    if (confirm("Supprimer toute la discussion ?")) {
        chatMessages.innerHTML = '';
        alert("🧹 Historique effacé.");
    }
    closeContextMenu();
}