import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';

export default function SettingsView() {
    const [loading, setLoading] = useState(true);

    return (
        <View style={styles.container}>
            <Text>Settings works !</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        height: '100%',
        width: '100%',

    }
})