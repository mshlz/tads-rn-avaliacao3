import * as Speech from 'expo-speech';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import translation from '../../translations/translation.json';
import { Input } from '../../components/Input';

type LangType = 'pt-BR' | 'en-US'
type Operation = '+' | '-' | '*' | '/'

export function OpMatScreen() {
  const [lang, setLang] = useState<LangType>('pt-BR') // TODO add way to change
  const [isSpeeching, setIsSpeeching] = useState(false)

  const [valueA, setValueA] = useState(0)
  const [valueB, setValueB] = useState(0)

  const speechOperation = (op: Operation, a: number, b: number, result: number) => {
    if (isSpeeching) {
      Speech.stop()
      setIsSpeeching(false)
    } else {
      setIsSpeeching(true)
    }

    const opName = translation[lang][op]
    const equalName = translation[lang]['=']

    const speechText = `${a} ${opName} ${b} ${equalName} ${result}`
    Speech.speak(speechText, { language: lang })
  }

  const executeOperation = (operation: Operation) => {
    let result: number

    switch (operation) {
      case '+':
        result = valueA + valueB
        break
      case '-':
        result = valueA - valueB
        break
      case '*':
        result = valueA * valueB
        break
      case '/':
        result = valueA / valueB
        break
      default:
        return
    }

    speechOperation(operation, valueA, valueB, result)
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='black' />

      <Input
        label="Value A"
        placeholder="Enter the first value"
        onChangeText={value => setValueA(+value)}
      />
      <Input
        label="Value B"
        placeholder="Enter the second value"
        onChangeText={value => setValueB(+value)}
      />


      <Button
        title="Sum"
        onPress={() => executeOperation('+')}
      />
      <Button
        title="Subtract"
        onPress={() => executeOperation('-')}
      />
      <Button
        title="Multiply"
        onPress={() => executeOperation('*')}
      />
      <Button
        title="Divide"
        onPress={() => executeOperation('/')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
