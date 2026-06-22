/**
 * Guestbook / Wishes Module
 * Manages wish form submission, persistence, and display of wishes
 */

const STORAGE_KEY = 'wedding_wishes';
const WISHES_TO_SHOW = 2;

export function initGuestbook() {
  // Load wishes from localStorage on page load
  loadWishes();

  // Handle form submission
  const wishesForm = document.getElementById('wishes-form');
  wishesForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const nameInput = document.getElementById('wish-name');
    const messageInput = document.getElementById('wish-message');

    // Validate inputs
    if (!nameInput.value.trim() || !messageInput.value.trim()) {
      alert('Please fill in both name and message');
      return;
    }

    // Create wish object
    const wish = {
      name: nameInput.value.trim(),
      message: messageInput.value.trim(),
      timestamp: new Date().toISOString()
    };

    // Get existing wishes from localStorage
    const wishes = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    
    // Add new wish to the beginning
    wishes.unshift(wish);
    
    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));

    // Clear form
    nameInput.value = '';
    messageInput.value = '';

    // Reload wishes display
    loadWishes();
  });

  // Handle "see more" button
  const seeMoreBtn = document.getElementById('see-more-btn');
  seeMoreBtn.addEventListener('click', function() {
    const wishCards = document.querySelectorAll('.wish-card');
    wishCards.forEach(card => card.classList.remove('hidden'));
    seeMoreBtn.classList.add('hidden');
  });
}

function loadWishes() {
  const wishes = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  const wishsList = document.getElementById('wishes-list');
  const seeMoreBtn = document.getElementById('see-more-btn');

  // Clear existing wishes
  wishsList.innerHTML = '';

  // Render wishes
  wishes.forEach((wish, index) => {
    const isHidden = index >= WISHES_TO_SHOW;
    renderWishCard(wish, wishsList, isHidden);
  });

  // Show/hide "see more" button and wishes list
  if (wishes.length > WISHES_TO_SHOW) {
    seeMoreBtn.classList.remove('hidden');
    wishsList.classList.remove('hidden');
  } else if (wishes.length > 0) {
    seeMoreBtn.classList.add('hidden');
    wishsList.classList.remove('hidden');
  } else {
    seeMoreBtn.classList.add('hidden');
    wishsList.classList.add('hidden');
  }
}

function renderWishCard(wish, container, isHidden = false) {
  const card = document.createElement('div');
  card.className = `wish-card bg-white border border-[#E0D5C7] rounded-lg p-6 ${isHidden ? 'hidden' : ''}`;
  
  card.innerHTML = `
    <div class="flex gap-3 mb-3">
      <span class="text-[#8A6D3B] text-xl">•</span>
      <div class="flex-1">
        <p class="font-semibold text-[#3A3A3A]">${escapeHtml(wish.name)}</p>
        <p class="text-[#5A5A5A] text-sm italic mt-2">"${escapeHtml(wish.message)}"</p>
      </div>
    </div>
  `;
  
  container.appendChild(card);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
