
import {Text, View, StyleSheet, TouchableOpacity, TextInput, Animated, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard} from "react-native";

export default function CWScreen1() {
    return (

        <View>

            <View>
                <Text>Temp stuff</Text>
            </View>

            <TouchableOpacity style={styles.button}>
                <Text>Tempo</Text>
            </TouchableOpacity>


        </View>


    );
}

const styles = StyleSheet.create({
    button: {
        width: 100,
        height: 100,
        backgroundColor: 'red',
        marginTop: 100,
        marginLeft: 100,
    },
});
