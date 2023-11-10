const wordInput = document.getElementById('word-input');
const searchButton = document.getElementById('search-button');
const meaningNoun = document.getElementById('meaning-noun');
const meaningAdjective = document.getElementById('meaning-adjective');
const antonyms = document.getElementById('antonyms');
const examples = document.getElementById('examples');
const relatedUrls = document.getElementById('related-urls');
const synonymsList = document.getElementById('synonyms');

const dictionaryApiUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

// Assuming you have already defined the necessary elements (wordInput, searchButton, etc.)
// Function to fetch and display word definition
function searchWordDefinition() {
  const word = wordInput.value;

  fetch(dictionaryApiUrl + word)
    .then((response) => response.json())
    .then((data) => {
      // Clear previous results
      meaningNoun.innerHTML = '';
      meaningAdjective.innerHTML = '';
      antonyms.innerHTML = '';
      examples.innerHTML = '';
      relatedUrls.innerHTML = '';

      data.forEach((entry) => {
        entry.meanings.forEach((meaning) => {
          if (meaning.partOfSpeech === 'noun') {
            meaningNoun.innerHTML = `<p><strong>Noun:</strong> ${meaning.definitions[0].definition}</p>`;
          } else if (meaning.partOfSpeech === 'adjective') {
            meaningAdjective.innerHTML = `<p><strong>Adjective:</strong> ${meaning.definitions[0].definition}</p>`;
          }
          if (meaning.antonyms) {
            antonyms.innerHTML = `<p><strong>Antonyms:</strong> ${meaning.antonyms.join(', ')}</p>`;
          }
        });
        if (entry.examples) {
          examples.innerHTML = `<p><strong>Examples:</strong> ${entry.examples.join('<br>')}</p>`;
        }
        if (entry.phonetics && entry.phonetics.length > 0) {
          // Assuming you have an audio element with ID "wordAudio"
          const audioElement = document.getElementById('wordAudio');
          audioElement.src = entry.phonetics[0].audio;
          audioElement.play();
        }
        if (entry.sourceUrls && entry.sourceUrls.length > 0) {
          sourceUrl.innerText = entry.sourceUrls[0];
        }
      });
    })
    .catch((error) => {
      console.error('Error fetching word definition:', error);
    });
    // Assuming you have an element with ID "synonyms"
    const synonymsList = document.getElementById('synonyms');
    if (entry.synonyms) {
      synonymsList.innerHTML = `<p><strong>Synonyms:</strong> ${entry.synonyms.join(', ')}</p>`;
    }

}
// Assuming you have already defined the necessary elements (wordInput, searchButton, etc.)
// Function to fetch and display synonyms
function findSynonyms() {
  const word = wordInput.value;

  // Clear previous results
  synonymsList.innerHTML = '';

  if (word.trim() === '') {
    return;
  }

  const params = new URLSearchParams({
    rel_syn: word,
    max: 10, // Adjust the number of synonyms displayed as needed
  });

  fetch(`${datamuseApiUrl}?${params}`)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((entry) => {
        const synonym = entry.word;
        const listItem = document.createElement('li');
        listItem.textContent = synonym;
        synonymsList.appendChild(listItem);
      });
    })
    .catch((error) => {
      console.error('Error fetching synonyms:', error);
    });
}
// Function to speak the word's pronunciation
function speakWord(word) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(word);
  synth.speak(utterance);
}
document.addEventListener('DOMContentLoaded', function () {
  const wordSynonyms = document.getElementById('wordSynonyms');

  // Function to fetch and display synonyms
  function fetchAndDisplaySynonyms() {
    // API URL for a thesaurus (You may need to sign up for a thesaurus API and replace this URL)
    const apiUrl = 'https://api.thesaurusapi.com/v1/words/digital/synonyms';

    fetch(apiUrl, {
      headers: {
        'Authorization': 'https://api.dictionaryapi.dev/api/v2/entries/en/<word>' // Replace with your API key
      }
    })
      .then((response) => response.json())
      .then((data) => {
        const synonyms = data.synonyms.join(', ');
        wordSynonyms.textContent = `Synonyms: ${synonyms}`;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  

  // Call the function to fetch and display synonyms when the page loads
  fetchAndDisplaySynonyms();
});

// Add event listeners for both actions
searchButton.addEventListener('click', searchWordDefinition);
searchButton.addEventListener('click', findSynonyms);

// Assuming you have a list of words for each day
const wordOfTheDayList = [
  { word: 'serendipity', definition: 'the occurrence and development of events by chance in a happy or beneficial way.' },
  { word: 'ephemeral', definition: 'lasting for a very short time.' },
  { word: 'quixotic', definition: 'exceedingly idealistic; unrealistic and impractical.' },
  // ... add more words here
];

// Get the current date
const currentDate = new Date();
const dayOfMonth = currentDate.getDate();

// Get the word of the day based on the day of the month
const wordOfTheDay = wordOfTheDayList[dayOfMonth % wordOfTheDayList.length];

// Display the word and its definition
document.getElementById('word-of-the-day').textContent = `Word of the Day: ${wordOfTheDay.word}`;
document.getElementById('word-definition').textContent = wordOfTheDay.definition;

document.getElementById('wordDefinition').innerHTML = '<p><strong>Definition:</strong> ' + entry.definition + '</p>';

var img = document.createElement('img');
img.src = 'https://example.com/path/to/picture.jpg';
document.body.appendChild(img);