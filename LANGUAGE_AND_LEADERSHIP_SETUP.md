# Language Toggle and Leadership Messages Setup

## Backend Setup (✓ Complete)
- Created `LeadershipMessage` model with CEO and Managing Director roles
- Added English and Nepali message fields
- Created API endpoint at `/api/leadership/`
- Migration applied

## Frontend Setup (In Progress)

### 1. Language Context (✓ Complete)
- Created `LanguageContext.jsx` for managing language state
- Integrated into App.jsx

### 2. Navbar Language Toggle Button (TODO)
Add a language toggle button in the Navbar that switches between English and Nepali:
```jsx
// In Navbar.jsx, add this button next to nav links:
<button
  onClick={toggleLanguage}
  className="px-4 py-2 bg-white/20 text-white rounded-full hover:bg-white/30"
>
  {language === 'english' ? 'नेपाली' : 'English'}
</button>
```

### 3. Team Page Leadership Messages (TODO)
Before the "Our Team" section, add two cards in a row:

**Structure:**
```
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
  {/* CEO Card */}
  <div className="bg-white rounded-3xl shadow-2xl p-8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Image Card */}
      <div className="rounded-2xl overflow-hidden">
        <img src={ceo.image} />
      </div>
      {/* Message Card */}
      <div>
        <h3>Message from CEO</h3>
        <p>{language === 'english' ? ceo.message_english : ceo.message_nepali}</p>
      </div>
    </div>
  </div>
  
  {/* Managing Director Card - Same structure */}
</div>
```

### 4. Add Leadership API Call
In Team.jsx:
```javascript
import { getLeadershipMessages } from '../api/axios'
const [leadership, setLeadership] = useState([])

// In useEffect:
const leadershipRes = await getLeadershipMessages()
setLeadership(leadershipRes.data)

// Find CEO and MD:
const ceo = leadership.find(l => l.role === 'ceo')
const md = leadership.find(l => l.role === 'md')
```

## Admin Usage
1. Go to Django Admin
2. Find "Leadership Messages"
3. Add two entries:
   - Role: CEO, Name, Image, Message (English & Nepali)
   - Role: Managing Director, Name, Image, Message (English & Nepali)
4. Check "Is Active" for both

## Translation Notes
For full Nepali translation, you'll need to:
1. Add Nepali translations for all static text
2. Update backend models to include Nepali fields for products, services, etc.
3. This is a large task that requires comprehensive translation work
