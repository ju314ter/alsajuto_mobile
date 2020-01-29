import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function NotificationsView() {
    const [loading, setLoading] = useState(true);

    return (
        <View style={styles.container}>
            <Text>Notifications works !</Text>
            <Text>Message list component !</Text>
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