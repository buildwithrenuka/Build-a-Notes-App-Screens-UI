# 🇳🇴 Norway Travel Notes App

A beautifully designed **Notes App** built with **React Native + Expo**, themed around a Norway travel journal. Built as part of a React Native UI assignment.

---

## 📱 Screens

### View 1 — Notes Listing Screen
- Scrollable list of notes using `FlatList`
- Each note card shows **tag**, **date**, **title**, and **content preview**
- **Search bar** to filter notes by title, content, or tag
- **Dark / Light mode toggle** via `Switch`
- **Floating Action Button (+)** to create a new note
- Norway-themed `ImageBackground` header with green fjord photo

### View 2 — Note Editor Screen
- `TextInput` for note title
- Multiline `TextInput` for note body
- `KeyboardAvoidingView` — keyboard never overlaps inputs
- `ImageBackground` header with Norway forest photo
- **Back** and **Save** buttons via `Pressable`
- Detects new note vs existing note — label shows `✨ NEW NOTE` or `✏️ EDITING`

---

## ✅ Assignment Requirements Covered

| Requirement | Implementation |
|---|---|
| `FlatList` | Notes listing screen |
| `TextInput` | Search bar, title input, content input |
| `Pressable` | Note cards, Back, Save, FAB, Clear button |
| `Switch` | Dark / Light mode toggle |
| `KeyboardAvoidingView` | Note editor screen |
| `ImageBackground` | Both screens — header sections |
| `useColorScheme()` | Auto dark/light theme detection |
| `useWindowDimensions()` | Responsive layout for phones & tablets |
| `StyleSheet.create()` | All styles |
| `StyleSheet.compose()` | NoteCard — base + theme styles merged |
| `StyleSheet.flatten()` | SearchBar — TextInput style flattened |
| Dark & Light theme | Full theme system with `LIGHT_THEME` & `DARK_THEME` |
| Responsive layout | 2-column grid on tablets, 1-column on phones |

---

## 🗂️ Project Structure

```
app/
└── index.tsx        ← Both screens in one file

Components (inside index.tsx):
├── Header           ← ImageBackground + toggle
├── SearchBar        ← Filter input
├── NoteCard         ← Pressable card with tag/date/title/preview
├── NotesListScreen  ← View 1 (default export)
└── NoteEditorScreen ← View 2
```

---

## 🎨 Theme — Norway 2026

Inspired by Norwegian fjords, forests, and the aurora borealis.

| Token | Light | Dark |
|---|---|---|
| Background | `#EEF2F7` | `#0D1B2A` |
| Surface | `#FFFFFF` | `#112236` |
| Primary text | `#1A2744` | `#E8F0FA` |
| Accent | `#2E86AB` | `#48CAE4` |
| Border | `#D0DFF0` | `#1E3A52` |

**Images used:**
- Listing screen header — Green fjord lake (Unsplash)
- Editor screen header — Sunlit forest (Unsplash)

---

## ⚙️ How to Run

```bash
# Install dependencies
npm install

# Start Expo
npx expo start
```

Then scan the QR code with **Expo Go** app on your phone.

---

## 🚀 Features Beyond Requirements

- ✅ New note saved → appears at top of list
- ✅ Existing note edited → updates in place (no duplicate)
- ✅ Empty note validation before saving
- ✅ `✨ NEW NOTE` vs `✏️ EDITING` label in editor header
- ✅ Press animation on cards and buttons (`transform: scale`)
- ✅ Tag color pills with dot indicators
- ✅ Colored accent line at bottom of each card
- ✅ Search results count shown while filtering

---

## 👤 Built With

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Unsplash](https://unsplash.com/) — for header images