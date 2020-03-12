import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ProposalsView() {
    const [loading, setLoading] = useState(true);

    return (
        <View style={styles.container}>
            <Text>Proposals works !</Text>
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