import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useThemeStyles } from "../theme/useThemeStyles";

type Language = "en" | "hi" | "gu";

export default function RulesScreen() {
    const { colors } = useThemeStyles();
    const [language, setLanguage] = useState<Language>("en");

    const rules = {
        en: {
            title: "Rules of Chess",
            content: `1. Setup
The chessboard consists of 64 squares (8x8). Each player starts with 16 pieces: 1 King, 1 Queen, 2 Rooks, 2 Knights, 2 Bishops, and 8 Pawns.

2. Movement
• King: Moves exactly one square in any direction (horizontal, vertical, or diagonal).
• Queen: Moves any number of vacant squares in any direction (horizontal, vertical, or diagonal).
• Rook: Moves any number of vacant squares horizontally or vertically.
• Bishop: Moves any number of vacant squares diagonally.
• Knight: Moves in an 'L' shape (two squares in one direction, then one square perpendicular). It is the only piece that can jump over other pieces.
• Pawn: Moves forward one square, but captures diagonally. On its very first move, it can advance two squares.

3. Special Moves
• Castling: A move involving the King and a Rook. The King moves two squares towards the Rook, and the Rook jumps over the King. Allowed only if neither piece has moved, the path is clear, and the King is not in or passing through check.
• En Passant: If a pawn moves two squares forward and lands beside an opponent's pawn, the opponent can capture it on the very next turn as if it had only moved one square.
• Pawn Promotion: When a pawn reaches the opposite end of the board, it must be replaced by a Queen, Rook, Bishop, or Knight of the same color.

4. Game End
• Check: The King is under direct attack by an opponent's piece. The player must make a move to escape check.
• Checkmate: The King is in check and there is no legal move to escape. The game is over and the attacking player wins.
• Stalemate: The player to move is NOT in check, but has no legal moves. The game ends in a draw.`,
        },
        hi: {
            title: "शतरंज के नियम",
            content: `1. सेटअप
शतरंज का बोर्ड 64 वर्गों (8x8) का होता है। प्रत्येक खिलाड़ी के पास 16 मोहरे होते हैं: 1 राजा, 1 वज़ीर (रानी), 2 हाथी, 2 घोड़े, 2 ऊँट और 8 प्यादे।

2. मोहरों की चाल
• राजा (King): किसी भी दिशा (सीधे या तिरछे) में केवल एक कदम चल सकता है।
• वज़ीर (Queen): किसी भी दिशा (सीधे या तिरछे) में कितने भी खाली वर्गों तक चल सकता है।
• हाथी (Rook): क्षैतिज या लंबवत (सीधे) दिशा में कितने भी खाली वर्गों तक चल सकता है।
• ऊँट (Bishop): तिरछे (विकर्ण) दिशा में कितने भी खाली वर्गों तक चल सकता है।
• घोड़ा (Knight): 'L' आकार में (ढाई कदम) चलता है। यह अकेला मोहरा है जो अन्य मोहरों के ऊपर से कूद सकता है।
• प्यादा (Pawn): सीधे एक कदम आगे चलता है, लेकिन मारता तिरछे है। अपनी पहली चाल में यह दो कदम भी चल सकता है।

3. विशेष चालें
• कैसलिंग (Castling): यह राजा और हाथी को एक साथ चलने की विशेष चाल है। इसमें राजा हाथी की ओर दो कदम बढ़ता है और हाथी राजा को पार कर उसके बगल में आ जाता है। यह तभी संभव है जब दोनों ने पहले कोई चाल न चली हो, उनके बीच कोई मोहरा न हो और राजा चेक में न हो।
• एन पासेंट (En Passant): अगर एक प्यादा दो कदम आगे बढ़ता है और विरोधी प्यादे के बगल में आ जाता है, तो विरोधी प्यादा उसे तुरंत अगली चाल में मार सकता है, जैसे कि वह केवल एक कदम चला हो।
• प्रमोशन (Promotion): जब कोई प्यादा बोर्ड के अंतिम छोर पर पहुँचता है, तो उसे वज़ीर, हाथी, ऊँट या घोड़े में बदला जा सकता है।

4. खेल का अंत
• चेक (Check): जब राजा पर सीधे हमले का खतरा होता है। खिलाड़ी को चेक से बचना अनिवार्य है।
• चेकमेट (Checkmate): जब राजा चेक में हो और बचने का कोई रास्ता न हो। इस स्थिति में खेल खत्म हो जाता है और हमला करने वाला खिलाड़ी जीत जाता है।
• स्टेलमेट (Stalemate): जब किसी खिलाड़ी के पास कोई वैध चाल न हो और उसका राजा चेक में भी न हो। यह खेल ड्रा (बराबर) माना जाता है।`,
        },
        gu: {
            title: "ચેસના નિયમો",
            content: `1. ગોઠવણી (Setup)
ચેસ બોર્ડ 64 ખાનાઓ (8x8) નું બનેલું હોય છે. દરેક ખેલાડી પાસે 16 મોહરા હોય છે: 1 રાજા, 1 વજીર (રાણી), 2 હાથી, 2 ઘોડા, 2 ઊંટ અને 8 પ્યાદા.

2. મોહરાની ચાલ
• રાજા (King): કોઈપણ દિશામાં (સીધા કે ત્રાંસા) માત્ર એક પગલું ચાલી શકે છે.
• વજીર (Queen): કોઈપણ દિશામાં (સીધા કે ત્રાંસા) ગમે તેટલા ખાલી ખાનાઓ સુધી ચાલી શકે છે.
• હાથી (Rook): સીધી દિશામાં (આડા કે ઊભા) ગમે તેટલા ખાલી ખાનાઓ સુધી ચાલી શકે છે.
• ઊંટ (Bishop): ત્રાંસી દિશામાં ગમે તેટલા ખાલી ખાનાઓ સુધી ચાલી શકે છે.
• ઘોડો (Knight): 'L' આકારમાં (અઢી ડગલાં) ચાલે છે. તે એકમાત્ર મોહરું છે જે અન્ય મોહરા પરથી કૂદી શકે છે.
• પ્યાદું (Pawn): સીધું એક પગલું આગળ ચાલે છે, પણ મારે છે ત્રાંસુ. પોતાની પહેલી ચાલમાં તે બે પગલાં પણ ચાલી શકે છે.

3. વિશેષ ચાલો
• કેસલિંગ (Castling): આ રાજા અને હાથીની એકસાથે થતી ખાસ ચાલ છે. રાજા હાથી તરફ બે પગલાં ચાલે છે અને હાથી રાજાને કૂદીને તેની બાજુમાં ગોઠવાય છે. આ ત્યારે જ શક્ય છે જ્યારે બંનેએ અગાઉ કોઈ ચાલ ન ચાલી હોય, રસ્તો સાફ હોય અને રાજા ચેકમાં ન હોય.
• એન પાસન્ટ (En Passant): જો એક પ્યાદું બે પગલાં આગળ વધે અને વિરોધી પ્યાદાની બાજુમાં આવે, તો વિરોધી પ્યાદું તેને તરત પછીની ચાલમાં મારી શકે છે, જાણે કે તે માત્ર એક જ પગલું ચાલ્યું હોય.
• પ્રમોશન (Promotion): જ્યારે પ્યાદું બોર્ડના છેવાડે પહોંચે છે, ત્યારે તેને વજીર, હાથી, ઊંટ કે ઘોડામાં બદલી શકાય છે.

4. રમતનો અંત
• ચેક (Check): જ્યારે રાજા પર સીધો હુમલો થાય છે. ખેલાડીએ ચેકમાંથી બચવું ફરજિયાત છે.
• ચેકમેટ (Checkmate): જ્યારે રાજા ચેકમાં હોય અને બચવાનો કોઈ રસ્તો ન હોય. રમત પૂરી થાય છે અને હુમલો કરનાર ખેલાડી જીતે છે.
• સ્ટેલમેટ (Stalemate): જ્યારે કોઈ ખેલાડી પાસે કોઈ કાયદેસર ચાલ ન હોય અને રાજા ચેકમાં પણ ન હોય. આ સ્થિતિમાં રમત ડ્રો (સરભર) ગણાય છે.`,
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.tabContainer}>
                {(["en", "hi", "gu"] as Language[]).map((lang) => (
                    <TouchableOpacity
                        key={lang}
                        style={[
                            styles.tab,
                            language === lang ? { backgroundColor: colors.accent } : { backgroundColor: colors.customBackground },
                        ]}
                        onPress={() => setLanguage(lang)}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                { color: language === lang ? "white" : colors.text }
                            ]}
                        >
                            {lang === "en" ? "English" : lang === "hi" ? "हिंदी" : "ગુજરાતી"}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={[styles.title, { color: colors.text }]}>
                    {rules[language].title}
                </Text>
                <Text style={[styles.content, { color: colors.text }]}>
                    {rules[language].content}
                </Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 10,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        marginHorizontal: 5,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    tabText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    scrollContent: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    content: {
        fontSize: 16,
        lineHeight: 26,
    },
});
