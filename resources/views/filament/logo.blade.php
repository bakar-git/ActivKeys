<!-- filepath: /home/bakar/projects/activkeys.com/resources/views/logo.blade.php -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Agbalumo&display=swap" rel="stylesheet">
<div class="flex items-center">
    <!-- Light theme logo -->
    <img src="{{ asset('logo.svg') }}" alt="Activ Keys" class="size-10 dark:hidden block">

    <!-- Dark theme logo -->
    <img src="{{ asset('logo-dark.svg') }}" alt="Activ Keys" class="size-10 hidden dark:block">

    <span class="mb-1 text-2xl ms-2"
        style="font-family: Agbalumo, system-ui; font-weight: 400; font-style: normal;">Activ
        Keys</span>
</div>
<script>
    // Dynamically set favicon based on theme
    function setFavicon() {
        const isDark = document.documentElement.classList.contains('dark');
        const faviconUrl = isDark ?
            '{{ asset('logo-dark.svg') }}' :
            '{{ asset('logo.svg') }}';

        let favicon = document.querySelector('link[rel="icon"]');
        if (!favicon) {
            favicon = document.createElement('link');
            favicon.rel = 'icon';
            document.head.appendChild(favicon);
        }
        favicon.href = faviconUrl;
    }

    setFavicon();

    // Observe theme changes
    const faviconObserver = new MutationObserver(setFavicon);
    faviconObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
    });
</script>
