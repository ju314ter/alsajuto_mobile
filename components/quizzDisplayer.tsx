import React, { useState, useEffect, useReducer } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, ActivityIndicator } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SegmentedControls } from 'react-native-radio-buttons'

export default function QuizzDisplayer(props) {
    const [index, setIndex] = useState(0)
    const [showAnswer, setCorrectionDisplay] = useState(false)
    const [answer, setAnswer] = useState('');
    const [score, setScore] = useState(0);

    const quizzTemplate = {
        idTemplate: 0,
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
                answers: ['Vrai', 'Faux', 'tabernac'],
                correctAnswer: 1
            },
            {
                label: 'oui ?',
                answers: ['Vrai', 'Faux', 'Plait-il ?'],
                correctAnswer: 0
            },
            {
                label: 'Sais-tu que tu ne sais pas ?',
                answers: ['Vrai', 'Faux', 'Ceci est un paradoxe'],
                correctAnswer: 2
            },
            {
                label: 'Satisfait de ce quizz ?',
                answers: ['Vrai', 'Faux', 'Peut-être'],
                correctAnswer: 2
            }
        ]
    }

    const quizzRecap = {
        quizzTemplateId: quizzTemplate.idTemplate,
        quizzId: 45876,
        userScore: [], //array des score, 1 = bonne réponse, 0 = mauvaise réponse
    }

    const currentQuestion = quizzTemplate.questions[index - 1]; //Alias for current question

    let correctionDisplay = null; //Component to display when correcting answer
    if (showAnswer == true) {
        correctionDisplay = (
            <Card title='Correction :' containerStyle={styles.cardContainerStyle}>
                <Text style={styles.answerStyle}>{answer}</Text>
                <Button title="Next" containerStyle={{ padding: 5 }} titleStyle={{ color: '#eeeeee' }}
                    buttonStyle={{ backgroundColor: '#8D011D' }}
                    onPress={() => {
                        setIndex(index + 1);
                        setCorrectionDisplay(false);
                    }
                    } />
            </Card>
        )
    } else {
        correctionDisplay = null;
    }

    let questionDisplay = null; // Component to display when answering question
    if (showAnswer == false && index !== 0 && index <= quizzTemplate.questions.length) {
        questionDisplay = (
            <Card title={currentQuestion.label} containerStyle={styles.cardContainerStyle}>
                <SegmentedControls
                    options={currentQuestion.answers}
                    direction='column'
                    onSelection={(selectedOptions, i) => { checkAnswers(i) }}
                />
            </Card>
        )
    } else {
        questionDisplay = null;
    }

    function checkAnswers(answerIndex) {
        setCorrectionDisplay(true);
        if (answerIndex == currentQuestion.correctAnswer) {
            setScore(score + 1);
            setAnswer('Bien joué !')
            quizzRecap.userScore.push(1);
        } else {
            setAnswer(`Raté ! la bonne réponse était : ${currentQuestion.answers[currentQuestion.correctAnswer]}`)
            quizzRecap.userScore.push(0);
        }
    }

    function continueProgress() {
        setIndex(quizzRecap.userScore.length + 1) // Nombre de questions déjà répondues
        setScore(quizzRecap.userScore.filter(x => x == 1).length);  // Nombre de bonne réponse  = score
    }

    useEffect(() => {
        continueProgress();
    }, []); // No dependancies => similar to component will mount

    return (
        <View style={styles.container}>
            {
                index !== 0 && index <= quizzTemplate.questions.length ? (
                    <View style={styles.answersWrapper}>
                        <Text style={styles.score}>Score : {score}</Text>
                        <View style={styles.cardWrapper}>
                            {questionDisplay}
                            {correctionDisplay}
                        </View>
                        <Text style={styles.pagination}>{index} / {quizzTemplate.questions.length}</Text>
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
                                        onPress={() => continueProgress()}
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
        backgroundColor: 'transparent',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    answersWrapper: {
        width: '80%',
        flex: 1,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    answerStyle: {
        fontSize: 20,
        padding: 10
    },
    score: {
        fontSize: 25,
        color: 'white'
    },
    pagination: {
        fontSize: 20,
        color: 'white'
    },
    cardWrapper: {
        width: '90%'
    },
    cardContainerStyle: {
        width: '100%',
    }
})