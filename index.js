document.addEventListener('DOMContentLoaded', function() {
  const terminalBanner = document.getElementById('terminal-banner');
  const terminalOutput = document.getElementById('terminal-output');
  const terminalForm = document.getElementById('terminal-form');
  const terminalInput = document.getElementById('terminal-input');
  const terminalContainer = document.getElementById('terminal');

  const PROMPT = '<span class="terminal-prompt">suyash@portfolio:~$</span> ';

  // Techie ASCII banner with border and system info
  const ASCII_BANNER = [
    `<span style="color:#7fffd4; font-family: 'Fira Mono', monospace; white-space: pre;">
       .-.        _______                             .  '  *   .  . '
      {{}}''; |==|_______D                              .  * * -+-  
      / ('        /|\                             .    * .    '  *
  (  /  |        / | \                                * .  ' .  . 
   \(_)_]]      /  |  \                            *   *  .   .
                                                     '   *
    </span>`,
    '<span style="color:#c8ffc8;">Welcome to <b>suyashxm</b> | <span style="color:#7fffd4;">suyashm480@gmail.com</span></span>',
    '<span style="color:#c8ffc8;">System: <span style="color:#7fffd4;">Linux x86_64</span> | Node v18.16.0 | Uptime: <span id="uptime" style="color:#7fffd4;">0s</span></span>',
    '<span style="color:#c8ffc8;">Type <span style="color:#7fffd4;">help</span> to see available commands.</span>'
  ];
  const ASCII_BANNER_ = [
    `<span style="color:#7fffd4; font-family: 'Fira Mono', monospace; white-space: pre;">
    ⠀⠀⠀⠀⠀⠀⠀⢀⡀⠤⠤⠄⢀⡀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢀⠔⠈⠀⠀⠀⠀⠀⠀⠀⠑⢄⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⡐⠁⢠⢰⣊⣄⣤⣄⣀⠀⠀⠀⠀⠑⡀⠀⠀⠀
⠀⠀⠀⠀⢀⠀⠐⠂⠉⠉⠉⣀⠉⠉⠛⠛⠶⣄⠀⠀⢱⠀⠀⠀
⠀⠀⡠⢐⠕⠀⠀⠠⢶⢷⡆⠘⣟⣢⣄⢠⠀⠈⠙⢄⢸⠀⠀⠀
⠀⠌⠀⠀⠀⠀⣠⣿⠏⢸⠇⠀⠘⣿⠹⣿⣿⢐⢄⢀⠑⠄⠀⠀
⠸⠀⠀⠀⡀⣽⣿⢿⢀⠈⠄⠈⠀⠇⣀⢽⣷⣜⣃⠡⠀⠀⢀⠀
⠀⠣⠀⣈⡰⢻⣿⠸⢎⡉⠣⠀⠈⠐⢡⡈⠸⣿⢯⡆⠰⠀⠀⡆
⠀⠀⠉⠢⣐⠁⢿⡆⠢⠥⠂⡃⠀⠰⠠⠔⠁⡷⢬⡟⠺⠀⢀⠇
⠀⠀⠀⠀⠀⠉⠊⢿⠀⢂⠤⡤⣦⡠⠀⠠⡰⠾⣋⣈⠶⠐⠊⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠑⠤⢀⡀⢁⣀⠬⠊⠉⠀⠀⠀⠀⠀⠀⠀
    </span>`,];
  const BOOT_LINES = [
    '<span style="color:#7fffd4;">[boot]</span> Initializing virtual terminal...',
    '<span style="color:#7fffd4;">[boot]</span> Loading modules: <span style="color:#c8ffc8;">core, ui, projects, game</span>',
    '<span style="color:#7fffd4;">[boot]</span> Welcome <span style="color:#c8ffc8;"></span>!',
    '<span style="color:#7fffd4;">[boot]</span> Use help command to nevigate or switch to ui mode <span style="color:#c8ffc8;"></span>!'

  ];

  const PROJECTS = {
    payx: {
      name: 'PayX',
      desc: 'P2P payment microservices with PayPal API. 1,000+ transactions, 98% success rate.',
      tech: 'Java, Spring Boot, MySQL, Docker',
      link: 'https://github.com/indolab/payx'
    },
    ton: {
      name: 'TON Token Tracker',
      desc: 'APIs for analyzing token balances, with caching for low latency.',
      tech: 'Java, Spring Boot',
      link: '#'
    },
    ebharat: {
      name: 'E-Bharat',
      desc: 'E-Commerce app with Spring Boot, MongoDB.',
      tech: 'Java, MongoDB, JPA, Spring Boot',
      link: 'https://github.com/indolab/Ecommerce'
    },
    conceptile: {
      name: 'Conceptile',
      desc: 'Quiz management microservices, concurrent users, admin dashboard.',
      tech: 'CRUD, REST API, MongoDB, Docker',
      link: 'https://github.com/indolab/conceptile'
    }
  };

  let gameActive = false;
  let gameNumber = null;
  let gameTries = 0;
  let booted = false;
  let startTime = Date.now();

  function getUptime() {
    const seconds = Math.floor((Date.now() - startTime) / 1000);
    if (seconds < 60) return seconds + 's';
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return min + 'm ' + sec + 's';
  }

  function updateUptime() {
    const uptimeSpan = document.getElementById('uptime');
    if (uptimeSpan) uptimeSpan.textContent = getUptime();
  }
  setInterval(updateUptime, 1000);

  function printLine(line = '', delay = 0) {
    return new Promise(resolve => {
      setTimeout(() => {
        const div = document.createElement('div');
        div.innerHTML = line;
        terminalOutput.appendChild(div);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
        resolve();
      }, delay);
    });
  }

  async function typeLine(line, delay = 10) {
    let out = '';
    for (let i = 0; i < line.length; i++) {
      out += line[i];
      terminalOutput.lastChild.innerHTML = out;
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
      await new Promise(r => setTimeout(r, delay));
    }
    terminalOutput.lastChild.innerHTML = out;
  }

  async function printTyped(line, delay = 10) {
    const div = document.createElement('div');
    terminalOutput.appendChild(div);
    await typeLine(line, delay);
  }

  function showHelp() {
    return [
      `<span style='color:#7fffd4;'><b>help</b></span>         <span style='color:#c8ffc8;'>Show this help message</span>`,
      `<span style='color:#7fffd4;'><b>about</b></span>        <span style='color:#c8ffc8;'>About me</span>`,
      `<span style='color:#7fffd4;'><b>projects</b></span>     <span style='color:#c8ffc8;'>List all projects</span>`,
      `<span style='color:#7fffd4;'><b>project &lt;name&gt;</b></span>  <span style='color:#c8ffc8;'>Show details for a project (e.g. project payx)</span>`,
      `<span style='color:#7fffd4;'><b>contact</b></span>      <span style='color:#c8ffc8;'>Show contact info</span>`,
      `<span style='color:#7fffd4;'><b>game</b></span>         <span style='color:#c8ffc8;'>Play a guessing game</span>`,
      `<span style='color:#7fffd4;'><b>ui</b></span>           <span style='color:#c8ffc8;'>Toggle UI mode (not implemented)</span>`,
      `<span style='color:#7fffd4;'><b>clear</b></span>        <span style='color:#c8ffc8;'>Clear the terminal</span>`,
      `<span style='color:#7fffd4;'><b>exit</b></span>         <span style='color:#c8ffc8;'>Exit the terminal</span>`,
    ];
  }

  function showAbout() {
    return [
      `<span style='color:#c8ffc8;'>Hi, I'm <b>Suyash Mishra</b>!</span>`,
      'Full-stack Java Developer skilled in Spring Boot microservices, REST/SOAP API design, and cloud-native deployment.',
      'Experienced in agile delivery, unit testing (JUnit, Mockito), and CI/CD with Docker and Jenkins.',
      'Proficient in front-end exposure (React/Angular) and database management (MySQL, MongoDB).',
      'Passionate about clean architecture, scalable systems, and fintech innovation.'
    ];
  }

  function showProjects() {
    return Object.keys(PROJECTS).map(
      key => `<span style='color:#7fffd4;'><b>${key}</b></span> - <span style='color:#c8ffc8;'>${PROJECTS[key].name}</span>`
    );
  }

  function showProject(name) {
    const p = PROJECTS[name.toLowerCase()];
    if (!p) return [`<span style='color:#ff7f7f;'>Project not found: ${name}</span>`];
    return [
      `<span style='color:#7fffd4;'><b>${p.name}</b></span>`,
      p.desc,
      `Tech: <span style='color:#c8ffc8;'>${p.tech}</span>`,
      p.link !== '#' ? `<a href="${p.link}" target="_blank" style='color:#7fffd4;'>${p.link}</a>` : ''
    ];
  }

  function showContact() {
    return [
      `Email: <a href="mailto:suyashm480@gmail.com" style='color:#7fffd4;'>suyashm480@gmail.com</a>`,
      `LinkedIn: <a href="https://www.linkedin.com/in/suyashxm/" target="_blank" style='color:#7fffd4;'>suyashxm</a>`,
      `GitHub: <a href="https://github.com/indolab" target="_blank" style='color:#7fffd4;'>indolab</a>`,
      `Twitter: <a href="https://twitter.com/suyashxm/" target="_blank" style='color:#7fffd4;'>@suyashxm</a>`
    ];
  }

  function showUI() {
    return [`<span style='color:#c8ffc8;'>UI toggle not implemented. You are already in the best mode!</span>`];
  }

  async function showExitCard() {
    // Blurred background and center message
    terminalContainer.style.backdropFilter = 'blur(8px)';
    terminalContainer.style.background = 'rgba(24,24,24,0.7)';
    terminalContainer.style.display = 'flex';
    terminalContainer.style.flexDirection = 'column';
    terminalContainer.style.justifyContent = 'center';
    terminalContainer.style.alignItems = 'center';
    terminalContainer.style.overflow = 'hidden';
    terminalContainer.style.height = '100vh';
    terminalOutput.innerHTML = '';
    terminalForm.style.display = 'none';

    // Terminal shutdown animation
    const shutdownLines = [
      '<span style="color:#7fffd4;">[system]</span> Saving session...',
      '<span style="color:#7fffd4;">[system]</span> Logging out user <span style="color:#c8ffc8;">suyash@portfolio</span>',
      '<span style="color:#7fffd4;">[system]</span> Shutting down virtual terminal...',
      '<span style="color:#7fffd4;">[system]</span> If you are considering candidates for an open technical role,',
      '<span style="color:#7fffd4;">[system]</span> <span style="color:#7fffd4;">Suyash Mishra</span> would love to connect.',
      '<span style="color:#7fffd4;">[system]</span> Goodbye!'
    ];
    for (const line of shutdownLines) {
      await printTyped(line, 15);
      await new Promise(r => setTimeout(r, 250));
    }
    await new Promise(r => setTimeout(r, 500));

    // Fade in final message
    const msg = document.createElement('div');
    msg.style.color = '#c8ffc8';
    msg.style.fontSize = '1.25em';
    msg.style.textAlign = 'center';
    msg.style.fontFamily = "'Fira Mono', monospace";
    msg.style.opacity = '0';
    msg.style.transition = 'opacity 1s';
    msg.innerHTML = `
      <div style="color:#7fffd4; font-size:1.2em; margin-bottom:1em;">
        <span class="terminal-prompt" style="font-size:1.1em;">suyash@portfolio:~$</span>
      </div>
      <div style="margin-bottom:1.5em;">
        <b>Thank you for visiting!</b><br><br>
        <span style="font-size:0.95em; color:#c8ffc8;">Contact: <a href="mailto:suyashm480@gmail.com" style="color:#7fffd4;">suyashm480@gmail.com</a></span>
      </div>
      <div style="margin-top:1.5em; color:#7fffd4; font-size:1.1em; animation: floatPrompt 2s infinite alternate;">
        <span class="terminal-prompt">_</span>
      </div>
      <style>@keyframes floatPrompt { 0%{transform:translateY(0);} 100%{transform:translateY(-10px);} }</style>
    `;
    terminalOutput.appendChild(msg);
    setTimeout(() => { msg.style.opacity = '1'; }, 100);
  }

  function showExit() {
    showExitCard();
    return [];
  }

  function clearTerminal() {
    terminalOutput.innerHTML = '';
    // Remove blur if present
    terminalContainer.style.backdropFilter = '';
    terminalContainer.style.background = '#181818';
  }

  function startGame() {
    gameActive = true;
    gameNumber = Math.floor(Math.random() * 100) + 1;
    gameTries = 0;
    return [
      `<span style='color:#c8ffc8;'>Guess the number between 1 and 100!</span>`,
      `<span style='color:#c8ffc8;'>Type your guess and press Enter.</span>`
    ];
  }

  function handleGameInput(input) {
    gameTries++;
    const guess = parseInt(input, 10);
    if (isNaN(guess)) return [`<span style='color:#ff7f7f;'>Please enter a valid number.</span>`];
    if (guess < gameNumber) return [`<span style='color:#c8ffc8;'>Too low!</span>`];
    if (guess > gameNumber) return [`<span style='color:#c8ffc8;'>Too high!</span>`];
    gameActive = false;
    return [`<span style='color:#7fffd4;'>Correct! You guessed it in ${gameTries} tries. Type 'game' to play again.</span>`];
  }

  // Disable/enable input for command flow
  function setInputEnabled(enabled) {
    terminalInput.disabled = !enabled;
    if (enabled) terminalInput.focus();
  }

  async function handleCommand(input) {
    setInputEnabled(false);
    input = input.trim();
    if (!input) {
      setInputEnabled(true);
      return;
    }
    await printLine(PROMPT + input);
    if (gameActive) {
      const lines = handleGameInput(input);
      for (const line of lines) await printTyped(line);
      setInputEnabled(true);
      terminalInput.focus();
      return;
    }
    const [cmd, ...args] = input.split(' ');
    switch (cmd.toLowerCase()) {
      case 'help':
        for (const line of showHelp()) await printTyped(line);
        break;
      case 'about':
        for (const line of showAbout()) await printTyped(line);
        break;
      case 'projects':
        for (const line of showProjects()) await printTyped(line);
        break;
      case 'project':
        if (args.length === 0) {
          await printTyped(`<span style='color:#ff7f7f;'>Usage: project &lt;name&gt;</span>`);
  } else {
          for (const line of showProject(args[0])) await printTyped(line);
        }
        break;
      case 'contact':
        for (const line of showContact()) await printTyped(line);
        break;
      case 'game':
        for (const line of startGame()) await printTyped(line);
        break;
      case 'ui':
        for (const line of showUI()) await printTyped(line);
        break;
      case 'clear':
        clearTerminal();
        break;
      case 'exit':
        showExit();
        return; // Do not re-enable input
      default:
        await printTyped(`<span style='color:#ff7f7f;'>Command not found: ${cmd}. Type 'help' for a list of commands.</span>`);
    }
    setInputEnabled(true);
    terminalInput.focus();
  }

  terminalForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    await handleCommand(terminalInput.value);
    terminalInput.value = '';
  });

  // Focus input on click anywhere
  window.addEventListener('click', () => terminalInput.focus());

  // UI/Terminal toggle logic
  const toggleBtn = document.getElementById('toggle-ui');
  const uiPortfolio = document.getElementById('ui-portfolio');
  toggleBtn.addEventListener('click', function() {
    if (uiPortfolio.style.display === 'none') {
      uiPortfolio.style.display = 'block';
      terminalContainer.style.display = 'none';
      toggleBtn.textContent = 'Switch to Terminal';
    } else {
      uiPortfolio.style.display = 'none';
      terminalContainer.style.display = 'flex';
      toggleBtn.textContent = 'Switch to UI';
      terminalInput.focus();
    }
  });

  // --- UI Navigation and Projects Logic ---
  const uiSections = {
    home: document.getElementById('ui-home'),
    about: document.getElementById('ui-about'),
    projects: document.getElementById('ui-projects'),
    contact: document.getElementById('ui-contact'),
  };
  const navLinks = document.querySelectorAll('.ui-nav');
  const projectsBtn = document.getElementById('ui-projects-btn');
  const projectsList = document.getElementById('ui-projects-list');
  const projectModal = document.getElementById('project-modal');

  // Project data
  const PROJECTS_UI = [
    {
      title: 'PayX',
      desc: 'P2P payment microservices with PayPal API. 1,000+ transactions, 98% success rate.',
      details: 'Built with Java, Spring Boot, MySQL, Docker. Secure, scalable, and integrated with PayPal for international transfers.'
    },
    {
      title: 'TON Token Tracker',
      desc: 'APIs for analyzing token balances, with caching for low latency.',
      details: 'Java, Spring Boot. Real-time analytics for 33 wallets, with advanced caching for performance.'
    },
    {
      title: 'E-Bharat',
      desc: 'E-Commerce app with Spring Boot, MongoDB.',
      details: 'Java, MongoDB, JPA, Spring Boot. Modern e-commerce backend with product, order, and user management.'
    },
    {
      title: 'Conceptile',
      desc: 'Quiz management microservices, concurrent users, admin dashboard.',
      details: 'CRUD, REST API, MongoDB, Docker. Multi-user quiz platform with admin controls and analytics.'
    },
    {
      title: 'Healtdoc',
      desc: 'Appointment scheduling and REST/SOAP APIs for healthcare.',
      details: 'Django, REST/SOAP, React. Improved appointment speed by 40%, robust error handling, and secure authentication.'
    }
  ];

  function showSection(section) {
    Object.values(uiSections).forEach(sec => sec.style.display = 'none');
    if (uiSections[section]) uiSections[section].style.display = '';
  }

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      showSection(link.dataset.section);
    });
  });
  projectsBtn.addEventListener('click', e => {
    e.preventDefault();
    showSection('projects');
  });

  // Render project cards
  function renderProjectCards() {
    projectsList.innerHTML = '';
    PROJECTS_UI.forEach((proj, idx) => {
      const card = document.createElement('div');
      card.className = 'ui-project-card';
      card.style.background = '#fff';
      card.style.borderRadius = '12px';
      card.style.boxShadow = '0 2px 8px rgba(0,0,0,0.07)';
      card.style.padding = '2em 1.5em 1.5em 1.5em';
      card.style.width = '260px';
      card.style.display = 'flex';
      card.style.flexDirection = 'column';
      card.style.alignItems = 'flex-start';
      card.style.justifyContent = 'space-between';
      card.style.position = 'relative';
      card.style.cursor = 'pointer';
      card.innerHTML = `
        <h3 style="font-size:1.25em;color:#222;margin-bottom:0.5em;">${proj.title}</h3>
        <p style="color:#444;font-size:1em;min-height:3em;">${proj.desc}</p>
        <button class="ui-project-view" data-idx="${idx}" style="margin-top:1.5em;background:#ffd600;color:#222;font-weight:bold;padding:0.6em 1.2em;border:none;border-radius:6px;cursor:pointer;">View Details</button>
      `;
      card.addEventListener('click', e => {
        if (!e.target.classList.contains('ui-project-view')) return;
        showProjectModal(idx);
      });
      projectsList.appendChild(card);
    });
  }

  function showProjectModal(idx) {
    const proj = PROJECTS_UI[idx];
    projectModal.innerHTML = `
      <div style="background:#fff;padding:2.5em 2em 2em 2em;border-radius:16px;max-width:420px;width:90vw;box-shadow:0 8px 32px 0 rgba(31,38,135,0.17);position:relative;display:flex;flex-direction:column;align-items:center;">
        <button id="close-modal" style="position:absolute;top:1em;right:1em;background:none;border:none;font-size:1.5em;color:#222;cursor:pointer;">&times;</button>
        <h2 style="color:#222;font-size:1.5em;margin-bottom:0.5em;">${proj.title}</h2>
        <p style="color:#444;font-size:1.1em;margin-bottom:1.2em;">${proj.details}</p>
      </div>
    `;
    projectModal.style.display = 'flex';
    document.getElementById('close-modal').onclick = () => projectModal.style.display = 'none';
    projectModal.onclick = e => { if (e.target === projectModal) projectModal.style.display = 'none'; };
  }

  // Remove the 'book' icon from the sidebar (if present)
  const sidebar = document.querySelector('#ui-portfolio aside');
  if (sidebar && sidebar.lastElementChild) sidebar.removeChild(sidebar.lastElementChild);

  // Initial render
  renderProjectCards();
  showSection('home');

  // Render banner on load
  terminalBanner.innerHTML = ASCII_BANNER.join("<br>");

  // Booting animation and initial greeting (no help on boot)
  (async function init() {
    setInputEnabled(false);
    for (const line of BOOT_LINES) await printTyped(line, 15);
    await printTyped('<br>');
    // Print ASCII banner
    for (const line of ASCII_BANNER_) await printTyped(line, 2);
    setInputEnabled(true);
    terminalInput.focus();
  })();
});
