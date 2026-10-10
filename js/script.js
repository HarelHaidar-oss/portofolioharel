/**
 * ============================================================================
 * Harel Haidar - Civil Engineering Portfolio
 * Main JavaScript File (js/script.js)
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // ------------------------------------------------------------------------
    // 1. Theme Management (Dark / Light Mode)
    // ------------------------------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleBtnMobile = document.getElementById('theme-toggle-mobile');
    const darkIcon = document.getElementById('theme-toggle-dark-icon');
    const lightIcon = document.getElementById('theme-toggle-light-icon');
    const darkIconMobile = document.getElementById('theme-toggle-dark-icon-mobile');
    const lightIconMobile = document.getElementById('theme-toggle-light-icon-mobile');

    /**
     * Updates sun & moon icon visibility across desktop and mobile toggles
     * @param {boolean} isDark 
     */
    function updateIcons(isDark) {
        if (isDark) {
            darkIcon?.classList.add('hidden');
            lightIcon?.classList.remove('hidden');
            darkIconMobile?.classList.add('hidden');
            lightIconMobile?.classList.remove('hidden');
        } else {
            lightIcon?.classList.add('hidden');
            darkIcon?.classList.remove('hidden');
            lightIconMobile?.classList.add('hidden');
            darkIconMobile?.classList.remove('hidden');
        }
    }

    /**
     * Toggles between dark and light themes
     */
    function toggleTheme() {
        const isCurrentDark = document.documentElement.classList.contains('dark');
        if (isCurrentDark) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
            updateIcons(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
            updateIcons(true);
        }
    }

    // Initialize theme based on localStorage or OS preference
    const savedTheme = localStorage.getItem('color-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'light' || (!savedTheme && !systemPrefersDark)) {
        document.documentElement.classList.remove('dark');
        updateIcons(false);
    } else {
        document.documentElement.classList.add('dark');
        updateIcons(true);
    }

    themeToggleBtn?.addEventListener('click', toggleTheme);
    themeToggleBtnMobile?.addEventListener('click', toggleTheme);

    // ------------------------------------------------------------------------
    // 2. Mobile Navigation Menu Toggle
    // ------------------------------------------------------------------------
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuIcon = mobileMenuBtn?.querySelector('i');
    const mobileMenu = document.getElementById('mobile-menu');

    function toggleMobileMenu() {
        if (!mobileMenu) return;
        const isHidden = mobileMenu.classList.toggle('hidden');
        if (mobileMenuIcon) {
            if (isHidden) {
                mobileMenuIcon.classList.remove('fa-times');
                mobileMenuIcon.classList.add('fa-bars');
            } else {
                mobileMenuIcon.classList.remove('fa-bars');
                mobileMenuIcon.classList.add('fa-times');
            }
        }
    }

    mobileMenuBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMobileMenu();
    });

    // Close mobile menu when clicking nav links
    mobileMenu?.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (!mobileMenu.classList.contains('hidden')) {
                toggleMobileMenu();
            }
        });
    });

    // Close mobile menu on resize to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            if (mobileMenuIcon) {
                mobileMenuIcon.classList.remove('fa-times');
                mobileMenuIcon.classList.add('fa-bars');
            }
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                toggleMobileMenu();
            }
        }
    });

    // ------------------------------------------------------------------------
    // 3. Active Nav Link on Scroll (ScrollSpy)
    // ------------------------------------------------------------------------
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    function highlightActiveNavLink() {
        const scrollPosition = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active-nav');
                    } else {
                        link.classList.remove('active-nav');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightActiveNavLink);
    highlightActiveNavLink();

    // ------------------------------------------------------------------------
    // 4. Portfolio Filter System
    // ------------------------------------------------------------------------
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');

            // Update button styles
            filterBtns.forEach(b => {
                b.classList.remove('active', 'bg-cyanAccent-600', 'text-white', 'shadow-md');
                b.classList.add(
                    'bg-white', 'dark:bg-navy-900',
                    'border', 'border-slate-200', 'dark:border-navy-800',
                    'text-slate-700', 'dark:text-slate-300'
                );
            });

            btn.classList.add('active', 'bg-cyanAccent-600', 'text-white', 'shadow-md');
            btn.classList.remove(
                'bg-white', 'dark:bg-navy-900',
                'border-slate-200', 'dark:border-navy-800',
                'text-slate-700', 'dark:text-slate-300'
            );

            // Filter project cards with fade effect
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                const isMatch = (filter === 'all' || category === filter);

                if (isMatch) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 20);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(12px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });

    // ------------------------------------------------------------------------
    // 5. Contact Form Interactive Submit (Direct to Email)
    // ------------------------------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = contactForm?.querySelector('button[type="submit"]');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            const name = nameInput?.value.trim() || 'Pengunjung';
            const senderEmail = emailInput?.value.trim() || '';
            const message = messageInput?.value.trim() || '';
            const targetEmail = 'harelpro179@gmail.com';

            const originalBtnContent = submitBtn?.innerHTML || '<span>Kirim Pesan</span><i class="fas fa-paper-plane text-xs"></i>';

            // Show active sending state on button
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `
                    <i class="fas fa-spinner fa-spin text-xs"></i>
                    <span>Membuka Email...</span>
                `;
            }

            // Construct mailto URL with formatted subject and body
            const emailSubject = encodeURIComponent(`Pesan Portofolio - Dari ${name}`);
            const emailBody = encodeURIComponent(
                `Halo Harel Haidar,\n\n` +
                `Nama Pengirim: ${name}\n` +
                `Email Pengirim: ${senderEmail}\n\n` +
                `Pesan:\n${message}\n\n` +
                `---\nDikirim melalui Formulir Kontak Portofolio Teknik Sipil`
            );
            const mailtoUrl = `mailto:${targetEmail}?subject=${emailSubject}&body=${emailBody}`;

            setTimeout(() => {
                // Direct user to email client
                window.location.href = mailtoUrl;

                formStatus.className = 'text-center text-xs font-medium p-3.5 rounded-xl border border-cyanAccent-500/50 bg-cyan-50 text-cyan-800 dark:bg-cyanAccent-950/40 dark:text-cyanAccent-300 transition-all shadow-sm space-y-1.5';
                formStatus.innerHTML = `
                    <div class="flex items-center justify-center gap-2">
                        <i class="fas fa-check-circle text-cyanAccent-500 text-sm"></i>
                        <span>Aplikasi email Anda dibuka untuk mengirim ke <strong>${targetEmail}</strong>.</span>
                    </div>
                    <div class="text-[11px] text-slate-500 dark:text-slate-400">
                        Tidak terbuka otomatis? <a href="${mailtoUrl}" class="underline font-semibold hover:text-cyanAccent-500">Klik di sini untuk membuka email</a>
                    </div>
                `;
                formStatus.classList.remove('hidden');

                contactForm.reset();

                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnContent;
                }

                // Hide alert after 8 seconds
                setTimeout(() => {
                    formStatus.classList.add('hidden');
                }, 8000);
            }, 400);
        });
    }

    // ------------------------------------------------------------------------
    // 6. Scroll Reveal Observer
    // ------------------------------------------------------------------------
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.12
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
    });

    // ------------------------------------------------------------------------
    // 7. Back to Top Floating Action Button
    // ------------------------------------------------------------------------
    const backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 350) {
                backToTopBtn.classList.remove('hide');
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
                backToTopBtn.classList.add('hide');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
