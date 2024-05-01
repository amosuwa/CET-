document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById('contactForm');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            errorMessage.style.display = 'block';
            successMessage.style.display = 'none';
        } else {
            
            errorMessage.style.display = 'none';
            successMessage.style.display = 'block';

           
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('message').value = '';
        }
    });


    const airdropForm = document.getElementById('airdropForm');
    const xrpWallet = document.getElementById('xrpWallet');

    airdropForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const walletAddress = xrpWallet.value.trim();
       
        const emailContent = `Wallet Address: ${walletAddress}`;
        window.location.href = `mailto:lamohabdul@gmail.com?subject=CET Airdrop&body=${emailContent}`;
        
        xrpWallet.value = '';
    });
});
