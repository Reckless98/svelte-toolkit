<script>
  import Header from '$lib/components/Header/Header.svelte';
  import Footer from '$lib/components/Footer/Footer.svelte';
  import { onMount } from 'svelte';

  // Enhanced global styling and animations
  onMount(() => {
    // Add smooth scrolling to the document
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add custom CSS animations
    const style = document.createElement('style');
    style.textContent = `
      /* Global enhancements */
      * {
        box-sizing: border-box;
      }
      
      body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        line-height: 1.6;
      }
      
      /* Custom animations */
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
      
      @keyframes glow {
        0%, 100% { box-shadow: 0 0 5px rgba(59, 130, 246, 0.5); }
        50% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.4); }
      }
      
      @keyframes gradient-x {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }
      
      @keyframes pulse-custom {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.8; }
      }
      
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
      }
      
      @keyframes bounce-custom {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-15px); }
      }
      
      /* Utility classes */
      .animate-float {
        animation: float 3s ease-in-out infinite;
      }
      
      .animate-glow {
        animation: glow 2s ease-in-out infinite;
      }
      
      .animate-gradient-x {
        background-size: 200% 200%;
        animation: gradient-x 3s ease infinite;
      }
      
      .animate-pulse-custom {
        animation: pulse-custom 2s ease-in-out infinite;
      }
      
      .animate-shake {
        animation: shake 0.5s ease-in-out;
      }
      
      .animate-bounce-custom {
        animation: bounce-custom 2s ease-in-out infinite;
      }
      
      /* Enhanced focus styles */
      *:focus {
        outline: 2px solid #3b82f6;
        outline-offset: 2px;
      }
      
      /* Smooth transitions */
      * {
        transition: all 0.2s ease;
      }
      
      /* Custom scrollbar */
      ::-webkit-scrollbar {
        width: 8px;
      }
      
      ::-webkit-scrollbar-track {
        background: #f1f5f9;
      }
      
      ::-webkit-scrollbar-thumb {
        background: #cbd5e1;
        border-radius: 4px;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: #94a3b8;
      }
      
      /* Dark mode scrollbar */
      .dark ::-webkit-scrollbar-track {
        background: #1e293b;
      }
      
      .dark ::-webkit-scrollbar-thumb {
        background: #475569;
      }
      
      .dark ::-webkit-scrollbar-thumb:hover {
        background: #64748b;
      }
    `;
    document.head.appendChild(style);
  });
</script>

<Header variant="floating" showBranding={true} />
<slot />
<Footer variant="expanded" showBranding={true} />