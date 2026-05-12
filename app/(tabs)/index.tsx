import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  Switch,
  StatusBar,
  StyleSheet,
  useColorScheme,
  useWindowDimensions,
  KeyboardAvoidingView,
  ImageBackground,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';

const SAMPLE_NOTES = [
  {
    id: '1',
    title: 'Morning Reflections',
    content: 'Woke up early today and watched the sunrise over the rooftops. There is something profoundly calming about those first golden hours.',
    date: 'Today, 6:42 AM',
    tag: 'Personal',
    tagColor: '#E8A87C',
  },
  {
    id: '3',
    title: 'Book Notes: Deep Work',
    content: 'Cal Newport argues that the ability to focus without distraction on cognitively demanding tasks is becoming increasingly rare.',
    date: 'Mon, 10:08 AM',
    tag: 'Reading',
    tagColor: '#A8E6CF',
  },
  {
    id: '4',
    title: 'Recipe — Lemon Risotto',
    content: 'Use arborio rice, good parmesan, fresh lemon zest, and a dry white wine. Keep stirring and add warm stock one ladle at a time.',
    date: 'Sun, 7:30 PM',
    tag: 'Home',
    tagColor: '#F7DC6F',
  },
];

const LIGHT_THEME = {
  background: '#EEF2F7',
  surface: '#FFFFFF',
  primary: '#1A2744',
  secondary: '#5C7A9E',
  accent: '#2E86AB',
  border: '#D0DFF0',
  searchBg: '#FFFFFF',
  switchTrackFalse: '#B8CCE0',
  switchTrackTrue: '#2E86AB',
  shadow: '#A0B8D0',
};

const DARK_THEME = {
  background: '#0D1B2A',
  surface: '#112236',
  primary: '#E8F0FA',
  secondary: '#7FA8C9',
  accent: '#48CAE4',
  border: '#1E3A52',
  searchBg: '#112236',
  switchTrackFalse: '#1E3A52',
  switchTrackTrue: '#48CAE4',
  shadow: '#000000',
};

// ── Change 1: Green fjord image + lighter green overlay ──
function Header({ theme, isDark, toggleTheme, noteCount }: {
  theme: typeof LIGHT_THEME;
  isDark: boolean;
  toggleTheme: () => void;
  noteCount: number;
}) {
  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80' }}
      style={headerStyles.header}
      resizeMode="cover"
    >
      <View style={headerStyles.overlay} />
      <View style={headerStyles.headerTop}>
        <View>
          <Text style={[headerStyles.headerGreeting, { color: 'rgba(255,255,255,0.7)' }]}>
            🇳🇴  MY TRAVEL NOTES
          </Text>
          <Text style={[headerStyles.headerTitle, { color: '#FFFFFF' }]}>
            Norway 2026
          </Text>
        </View>
        <View style={headerStyles.themeToggle}>
          <Text style={{ fontSize: 18 }}>{isDark ? '🌙' : '☀️'}</Text>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{
              false: theme.switchTrackFalse,
              true: theme.switchTrackTrue,
            }}
            thumbColor={isDark ? '#F0EAE0' : '#FFFFFF'}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const headerStyles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 52,
    paddingBottom: 24,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10, 40, 20, 0.45)', // ← green overlay, light pe bhi accha
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  headerGreeting: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2.5,
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  themeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingBottom: 6,
  },
});

function SearchBar({ value, onChangeText, theme }: {
  value: string;
  onChangeText: (text: string) => void;
  theme: typeof LIGHT_THEME;
}) {
  const flatInputStyle = StyleSheet.flatten([
    searchStyles.input,
    { color: theme.primary },
  ]);

  return (
    <View style={[searchStyles.wrapper, { backgroundColor: theme.background }]}>
      <View style={[searchStyles.container, { backgroundColor: theme.searchBg, borderColor: theme.border }]}>
        <Text style={[searchStyles.icon, { color: theme.secondary }]}>🔍</Text>
        <TextInput
          style={flatInputStyle}
          placeholder="Search notes..."
          placeholderTextColor={theme.secondary}
          value={value}
          onChangeText={onChangeText}
          returnKeyType="search"
        />
        {value.length > 0 && (
          <Pressable onPress={() => onChangeText('')} hitSlop={8}>
            <Text style={[searchStyles.clearBtn, { color: theme.secondary }]}>✕</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const searchStyles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1.5,
    paddingHorizontal: 14,
    paddingVertical: 11,
    gap: 10,
  },
  icon: {
    fontSize: 15,
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontWeight: '400',
    padding: 0,
    margin: 0,
  },
  clearBtn: {
    fontSize: 13,
    fontWeight: '600',
    paddingHorizontal: 4,
  },
});

function NoteCard({ note, theme, onPress }: {
  note: typeof SAMPLE_NOTES[0];
  theme: typeof LIGHT_THEME;
  onPress: () => void;
}) {
  const themedCard = StyleSheet.compose(cardStyles.card, {
    backgroundColor: theme.surface,
    borderColor: theme.border,
    shadowColor: theme.shadow,
  });

  return (
    <Pressable
      style={({ pressed }) => [
        themedCard,
        pressed && { opacity: 0.85, transform: [{ scale: 0.98 }] },
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Note: ${note.title}`}
    >
      <View style={cardStyles.cardHeader}>
        <View style={[cardStyles.tagPill, { backgroundColor: note.tagColor + '22' }]}>
          <View style={[cardStyles.tagDot, { backgroundColor: note.tagColor }]} />
          <Text style={[cardStyles.tagText, { color: note.tagColor }]}>{note.tag}</Text>
        </View>
        <Text style={[cardStyles.dateText, { color: theme.secondary }]}>{note.date}</Text>
      </View>

      <Text style={[cardStyles.cardTitle, { color: theme.primary }]} numberOfLines={1}>
        {note.title}
      </Text>

      <Text style={[cardStyles.cardPreview, { color: theme.secondary }]} numberOfLines={2}>
        {note.content}
      </Text>

      <View style={[cardStyles.cardAccent, { backgroundColor: note.tagColor + '55' }]} />
    </Pressable>
  );
}

const cardStyles = StyleSheet.create({
  card: {
    borderRadius: 18,
    borderWidth: 1.5,
    padding: 18,
    marginBottom: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
    position: 'relative',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  tagPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 5,
  },
  tagDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  dateText: {
    fontSize: 11,
    fontWeight: '500',
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: -0.3,
    marginBottom: 7,
    lineHeight: 22,
  },
  cardPreview: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  },
  cardAccent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
  },
});

export default function NotesListScreen() {
  const systemScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemScheme === 'dark');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentScreen, setCurrentScreen] = useState<'list' | 'editor'>('list');
  const [selectedNote, setSelectedNote] = useState<typeof SAMPLE_NOTES[0] | null>(null);
  const [notes, setNotes] = useState(SAMPLE_NOTES);
  const theme = isDark ? DARK_THEME : LIGHT_THEME;
  const { width } = useWindowDimensions();

  const filteredNotes = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return notes;
    return notes.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q) ||
        n.tag.toLowerCase().includes(q)
    );
  }, [searchQuery, notes]);

  if (currentScreen === 'editor') {
    return (
      <NoteEditorScreen
        note={selectedNote}
        onBack={() => {
          setCurrentScreen('list');
          setSelectedNote(null);
        }}
        onSave={(title, content) => {
          if (selectedNote) {
            setNotes(prev => prev.map(n =>
              n.id === selectedNote.id
                ? { ...n, title, content, date: 'Just now' }
                : n
            ));
          } else {
            const newNote = {
              id: Date.now().toString(),
              title: title || 'Untitled',
              content,
              date: 'Just now',
              tag: 'Personal',
              tagColor: '#E8A87C',
            };
            setNotes(prev => [newNote, ...prev]);
          }
          setCurrentScreen('list');
          setSelectedNote(null);
        }}
      />
    );
  }

  return (
    <View style={[styles.screen, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <FlatList
        data={filteredNotes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.listContent,
          { paddingHorizontal: 16, paddingBottom: 100 },
        ]}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <Header
              theme={theme}
              isDark={isDark}
              toggleTheme={() => setIsDark((p) => !p)}
              noteCount={notes.length}
            />
            <SearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
              theme={theme}
            />
          </>
        }
        renderItem={({ item }) => (
          <NoteCard
            note={item}
            theme={theme}
            onPress={() => {
              setSelectedNote(item);
              setCurrentScreen('editor');
            }}
          />
        )}
      />
      <Pressable
        style={({ pressed }) => [
          styles.fab,
          { backgroundColor: theme.accent },
          pressed && { transform: [{ scale: 0.93 }], opacity: 0.9 },
        ]}
        onPress={() => setCurrentScreen('editor')}
        accessibilityRole="button"
        accessibilityLabel="Create new note"
      >
        <Text style={styles.fabIcon}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 100,
  },
  fab: {
    position: 'absolute',
    bottom: 32,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: '300',
    lineHeight: 38,
    textAlign: 'center',
  },
});

function NoteEditorScreen({ onBack, note, onSave }: {
  onBack: () => void;
  note: typeof SAMPLE_NOTES[0] | null;
  onSave: (title: string, content: string) => void;
}) {
  const [title, setTitle] = useState(note?.title ?? '');
  const [content, setContent] = useState(note?.content ?? '');
  const systemScheme = useColorScheme();
  const isDark = systemScheme === 'dark';
  const theme = isDark ? DARK_THEME : LIGHT_THEME;
  const { width, height } = useWindowDimensions();

  return (
    <KeyboardAvoidingView
      style={[editorStyles.screen, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      {/* ── Change 2: Green forest image + green overlay ── */}
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80' }}
        style={[editorStyles.headerImage, { height: height > 700 ? 220 : 160 }]}
        resizeMode="cover"
      >
        <View style={editorStyles.headerOverlay} />

        <View style={[editorStyles.headerActions, { width }]}>
          <Pressable
            style={({ pressed }) => [
              editorStyles.backBtn,
              pressed && { opacity: 0.75 },
            ]}
            onPress={onBack}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Text style={editorStyles.backBtnText}>← Back</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              editorStyles.saveBtn,
              { backgroundColor: theme.accent },
              pressed && { opacity: 0.85, transform: [{ scale: 0.96 }] },
            ]}
            onPress={() => {
              if (!title.trim() && !content.trim()) {
                Alert.alert('Empty Note', 'Please add a title or content!');
                return;
              }
              onSave(title, content);
              Alert.alert('Saved! ✓', 'Your note has been saved.', [
                { text: 'OK', onPress: onBack },
              ]);
            }}
            accessibilityRole="button"
            accessibilityLabel="Save note"
          >
            <Text style={editorStyles.saveBtnText}>Save ✓</Text>
          </Pressable>
        </View>

        <View style={editorStyles.headerMeta}>
          <Text style={editorStyles.headerLabel}>
            {note ? '✏️  EDITING' : '✨  NEW NOTE'}
          </Text>
        </View>
      </ImageBackground>

      <ScrollView
        style={editorStyles.editorScroll}
        contentContainerStyle={editorStyles.editorContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <TextInput
          style={[
            editorStyles.titleInput,
            { color: theme.primary, borderBottomColor: theme.border },
          ]}
          placeholder="Note title..."
          placeholderTextColor={theme.secondary}
          value={title}
          onChangeText={setTitle}
          returnKeyType="next"
          maxLength={120}
          multiline={false}
          accessibilityLabel="Note title"
        />

        <Text style={[editorStyles.sectionHint, { color: theme.secondary }]}>
          📝  Start writing below...
        </Text>

        <TextInput
          style={[editorStyles.contentInput, { color: theme.primary }]}
          placeholder={'Let your thoughts flow freely...\n\nThis space is all yours.'}
          placeholderTextColor={theme.secondary}
          value={content}
          onChangeText={setContent}
          multiline
          textAlignVertical="top"
          scrollEnabled={false}
          accessibilityLabel="Note content"
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const editorStyles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  headerImage: {
    width: '100%',
    justifyContent: 'space-between',
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10, 40, 20, 0.45)', // ← Change 3: green overlay
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 52,
    paddingBottom: 8,
  },
  backBtn: {
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  backBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  saveBtn: {
    paddingVertical: 9,
    paddingHorizontal: 20,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  headerMeta: {
    paddingHorizontal: 22,
    paddingBottom: 18,
  },
  headerLabel: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2.5,
  },
  editorScroll: {
    flex: 1,
  },
  editorContent: {
    paddingHorizontal: 22,
    paddingTop: 24,
    paddingBottom: 60,
  },
  titleInput: {
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.5,
    lineHeight: 34,
    paddingVertical: 0,
    paddingBottom: 14,
    borderBottomWidth: 1.5,
    marginBottom: 14,
  },
  sectionHint: {
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.3,
    marginBottom: 20,
  },
  contentInput: {
    fontSize: 16,
    lineHeight: 27,
    fontWeight: '400',
    minHeight: 300,
    paddingVertical: 0,
  },
});