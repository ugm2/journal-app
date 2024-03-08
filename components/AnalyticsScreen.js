import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { fetchEntries } from '../services/journalService';
import generateWordCloudHtml from '../utils/generateWordCloudHtml';
import Slider from '@react-native-community/slider';
import { useFocusEffect } from '@react-navigation/native';

const AnalyticsScreen = () => {
    const [htmlContent, setHtmlContent] = useState('');
    const [error, setError] = useState('');
    const [minFrequency, setMinFrequency] = useState(2);
    const webviewRef = useRef(null);

    // fetchData is now solely responsible for data fetching and doesn't directly depend on state updates
    const fetchData = async (minFreq) => {
        try {
            const entries = await fetchEntries();
            if (entries.length > 0) {
                const combinedText = entries.map(e => `${e.title} ${e.content}`.toLowerCase()).join(' ');
                const wordCounts = combinedText.match(/\w+/g).reduce((acc, word) => {
                    acc[word] = acc[word] ? acc[word] + 1 : 1;
                    return acc;
                }, {});

                const filteredWordsArray = Object.keys(wordCounts)
                    .filter(word => wordCounts[word] >= minFreq)
                    .map(word => ({
                        text: word,
                        size: Math.log(wordCounts[word]) * 200 + 30, // Adjust the size calculation as necessary
                    }));

                if (filteredWordsArray.length > 0) {
                    setHtmlContent(generateWordCloudHtml(filteredWordsArray));
                    setError('');
                } else {
                    setError('No frequent words found.');
                    setHtmlContent('');
                }
            } else {
                setError('No entries found.');
                setHtmlContent('');
            }
        } catch (error) {
            setError('Failed to fetch entries.');
            console.error(error);
            setHtmlContent('');
        }
    };

    // This effect runs once on mount and again every time minFrequency changes
    useEffect(() => {
        fetchData(minFrequency);
    }, [minFrequency]);

    // To ensure the word cloud updates when navigating to the tab
    useFocusEffect(
        useCallback(() => {
            fetchData(minFrequency);
        }, [minFrequency])
    );

    return (
        <View style={styles.container}>
            {error ? (
                <View style={styles.errorContainer}>
                    <Text style={styles.error}>{error}</Text>
                </View>
            ) : (
                <WebView
                    originWhitelist={['*']}
                    source={{ html: htmlContent }}
                    javaScriptEnabled={true}
                    ref={webviewRef}
                />
            )}
            <Slider
                style={styles.slider}
                minimumValue={1}
                maximumValue={10}
                step={1}
                value={minFrequency}
                onValueChange={value => setMinFrequency(value)} // setState actions are batched and asynchronous
                minimumTrackTintColor="#ec5f39"
                maximumTrackTintColor="#d3d3d3"
                thumbTintColor="#ec5f39"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between', // Adjust as necessary for layout
    },
    slider: {
        marginBottom: 20,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    error: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
    },
});

export default AnalyticsScreen;
