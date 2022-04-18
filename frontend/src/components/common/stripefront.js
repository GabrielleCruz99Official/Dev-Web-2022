//doc repris sur  la doc stripe à comprendre et modifier. *em

const stripe = stripe('pk_live_51KptrdLy9DPRC0rGrvGYQPepcANR6RZBK1VFTAkl5vMmgyuowBXIOn9nILC1ttcRqNW8CmPB7W78I9aM8tDwHo2Q00kVAFuu8m'); // Your Publishable Key
const elements = stripe.elements();

// Create our card inputs 
var style = {
  base: {
    color: "#FFFFFF"
  }
};

const card = elements.create('card', { style });
card.mount('#card-element');

const form = document.querySelector('form');
const errorEl = document.querySelector('#card-errors');

// Give our token to our form
const stripeTokenHandler = token => {
  const hiddenInput = document.createElement('input');
  hiddenInput.setAttribute('type', 'hidden');
  hiddenInput.setAttribute('name', 'stripeToken');
  hiddenInput.setAttribute('value', token.id);
  form.appendChild(hiddenInput);

  form.submit();
}

// Create token from card data
form.addEventListener('submit', e => {
  e.preventDefault();

  stripe.createToken(card).then(res => {
    if (res.error) errorEl.textContent = res.error.message;
    else stripeTokenHandler(res.token);
  })
})