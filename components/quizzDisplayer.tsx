import React, { useState, useEffect, useReducer } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SegmentedControls } from 'react-native-radio-buttons'

export default function QuizzDisplayer(props) {
    const [index, setIndex] = useState(0)
    const [showAnswer, setCorrectionDisplay] = useState(false)
    const [answer, setAnswer] = useState('');
    const [score, setScore] = useState(0);

    const quizzTemplate = {
        // theme : 'sport',
        // difficulty : 'medium',
        questions: [
            {
                label: 'La savate est l’autre nom de la boxe française ?',
                answers: ['Vrai', 'Faux', 'Ca reste à voir'],
                correctAnswer: 2
            },
            {
                label: 'Sydney est la capitale de l’Australie ?',
                answers: ['Vrai', 'Faux', 'Absolument'],
                correctAnswer: 1
            },
            {
                label: 'Montréal est la capitale du Canada ?',
                answers: ['Vrai', 'Faux', 'Peut-être'],
                correctAnswer: 1
            }
        ]
    }

    const currentQuestion = quizzTemplate.questions[index - 1];

    let correctionDisplay = null;
    if (showAnswer == true) {
        correctionDisplay = (
            <React.Fragment>
                <Text>{answer}</Text>
                <Button title="Next" containerStyle={{ padding: 5 }} titleStyle={{ color: '#eeeeee' }}
                    buttonStyle={{ backgroundColor: '#8D011D' }}
                    onPress={() => {
                        setIndex(index + 1);
                        setCorrectionDisplay(false);
                    }
                    } />
            </React.Fragment>
        )
    } else {
        correctionDisplay = null;
    }

    let questionComponent = null;
    if (showAnswer == false && index !== 0 && index <= quizzTemplate.questions.length) {
        questionComponent = (
            <React.Fragment>
                <Text>{currentQuestion.label}</Text>
                <SegmentedControls
                    options={currentQuestion.answers}
                    direction='column'
                    onSelection={(selectedOptions, i) => { checkAnswers(i) }}
                />
            </React.Fragment>
        )
    } else {
        questionComponent = null;
    }

    function checkAnswers(answerIndex) {
        setCorrectionDisplay(true);
        if (answerIndex == currentQuestion.correctAnswer) {
            setScore(score + 1);
            setAnswer('Correct !')
        } else {
            setAnswer(`Wrong ! Correct answer was ${currentQuestion.answers[currentQuestion.correctAnswer]}`)
        }
    }

    return (
        <View style={styles.container}>
            {
                index !== 0 && index <= quizzTemplate.questions.length ? (
                    <View style={styles.answersWrapper}>
                        <Text>Score : {score}</Text>
                        {questionComponent}
                        {correctionDisplay}
                        <Text>{index} / {quizzTemplate.questions.length}</Text>
                    </View>
                ) : (
                        index > quizzTemplate.questions.length ? (
                            <View>
                                <Text>Fin du Quizz !</Text>
                            </View>
                        ) : (
                                <View>
                                    <Text>Start your Quizz !!</Text>
                                    <Button title="Start !" containerStyle={{ padding: 5 }} titleStyle={{ color: '#eeeeee' }}
                                        buttonStyle={{ backgroundColor: '#8D011D' }}
                                        onPress={() => setIndex(1)}
                                    />
                                </View>
                            )
                    )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    answersWrapper: {
        width: '50%'
    }
})