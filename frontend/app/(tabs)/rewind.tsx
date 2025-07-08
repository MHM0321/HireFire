
import {Text, View, StyleSheet, TouchableOpacity, TextInput, Animated, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard} from "react-native";

export default function RewindScreen() {
    return (

        <View>

            <View>
                <Text>Rewind</Text>
            </View>

            <TouchableOpacity style={styles.button}>
                <Text>Rewind</Text>
            </TouchableOpacity>


        </View>


    );
}

const styles = StyleSheet.create({
    button: {
        width: 100,
        height: 100,
        backgroundColor: 'yellow',
        marginTop: 100,
        marginLeft: 100,
    },
});
