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
                answers: ['Vrai', 'Faux', 'Peut-être'],
                correctAnswer: 1
            },
            {
                label: 'La bite a thomas est elle ?',
                answers: ['Vrai', 'Faux', 'Peut-être'],
                correctAnswer: 1
            },
            {
                label: 'Sais-tu que tu ne sais pas ?',
                answers: ['Vrai', 'Faux', 'Peut-être'],
                correctAnswer: 3
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
        userScore: [1, 0], //utilisateur a répondu a deux question, bon a la première, faux a la deuxième
    }

    const currentQuestion = quizzTemplate.questions[index - 1]; //Alias for current question

    let correctionDisplay = null; //Component to display when correcting answer
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

    let questionDisplay = null; // Component to display when answering question
    if (showAnswer == false && index !== 0 && index <= quizzTemplate.questions.length) {
        questionDisplay = (
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
        questionDisplay = null;
    }

    function checkAnswers(answerIndex) {
        setCorrectionDisplay(true);
        if (answerIndex == currentQuestion.correctAnswer) {
            setScore(score + 1);
            setAnswer('Correct !')
            quizzRecap.userScore.push(1);
        } else {
            setAnswer(`Wrong ! Correct answer was ${currentQuestion.answers[currentQuestion.correctAnswer]}`)
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
                        <Text>Score : {score}</Text>
                        {questionDisplay}
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
    }
})