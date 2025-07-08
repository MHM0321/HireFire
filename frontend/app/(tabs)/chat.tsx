
import {Text, View, StyleSheet, TouchableOpacity, TextInput, Animated, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard} from "react-native";

export default function ChatScreen() {
    return (

        <View>

            <View>
                <Text>Chat Chat Chat</Text>
            </View>

            <TouchableOpacity style={styles.button}>
                <Text>Chat Chat</Text>
            </TouchableOpacity>


        </View>


    );
}

const styles = StyleSheet.create({
    button: {
        width: 100,
        height: 100,
        backgroundColor: 'blue',
        marginTop: 100,
        marginLeft: 100,
    },
});
