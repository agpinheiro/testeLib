import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, PermissionsAndroid, ScrollView } from 'react-native';
import NfcManager, { Ndef, NfcTech, TagEvent, NfcEvents, NdefStatus } from 'react-native-nfc-manager';
import { NavProps } from '../navigation/Stack';
import Lottie from '../components/Lottie';


type Status = 'Buscando!' | 'Parado!' | 'Error!' | 'Sucesso!'

type Tag = TagEvent | null

interface State {
    isSupported: boolean
    status: Status;
    tag: Tag;
}

interface AttState {
    key: keyof State;
    value: Tag | Status | boolean;
}

const NFC: React.FC<NavProps> = ({ navigation }) => {
    const [state, setState] = useState<State>({ status: 'Parado!', tag: null, isSupported: false });
    const [message, setMessage] = useState('');


    useEffect(() => {
        hasSupportedNfc()

        return () => {
            NfcManager.setEventListener(NfcEvents.DiscoverTag, null)
            NfcManager.setEventListener(NfcEvents.SessionClosed, null)
        }
    }, [])

    const attState = (item?: AttState | AttState[]) => {
        if (Array.isArray(item)) {
            setState(prev => {
                item.forEach(i => {
                    // @ts-ignore
                    prev[i.key] = i.value
                })
                return { ...prev };
            })
            return
        }
        if (item) {
            setState(prev => {
                // @ts-ignore
                prev[item.key] = item.value;
                return { ...prev };
            })
        }
    }

    const hasSupportedNfc = async () => {
        try {
            const status = await NfcManager.isSupported()
            if (status) {
                NfcManager.start()
                attState({ key: 'isSupported', value: true })
                return
            }

        } catch (e) {
            attState({ key: 'isSupported', value: false })
        }
    }


    async function readNdef() {
        if (!state.isSupported) return
        attState({ key: 'status', value: 'Buscando!' })
        attState({ key: 'tag', value: null })
        try {
            await NfcManager.requestTechnology([NfcTech.NfcA, NfcTech.NfcF]);
            const tag = await NfcManager.getTag();

            if (tag?.ndefMessage && tag.ndefMessage.length > 0) {
                const payloadString = Ndef.util.bytesToString(tag.ndefMessage[0].payload);
                setMessage(payloadString)
            }
            if (tag) {
                attState([{ key: 'tag', value: tag }, { key: 'status', value: 'Sucesso!' }])
            }
        } catch (ex) {
            attState({ key: 'status', value: 'Error!' })
        } finally {
            NfcManager.cancelTechnologyRequest();
        }
    }

    async function writeNdef() {
        if (!state.isSupported) return
        let result = false;

        try {
            await NfcManager.requestTechnology(NfcTech.Ndef);

            const bytes = Ndef.encodeMessage([Ndef.textRecord('Hello NFC')]);

            if (bytes) {
                await NfcManager.ndefHandler.writeNdefMessage(bytes);
                result = true;
            }
        } catch (err) {
            console.warn(err);
        } finally {
            NfcManager.cancelTechnologyRequest();
        }

        return result;
    }


    const keys = state.tag ? Object.keys(state.tag) : [];

    return (
        <ScrollView contentContainerStyle={styles.container} style={styles.wrapper}>
            <View style={{ gap: 50, alignItems: 'center' }}>
                <View style={{ width: 120, height: 120, marginTop: 80 }}>
                    {state.status === 'Buscando!' && <Lottie uri={require('../assets/load.json')} />}
                    {state.status === 'Sucesso!' && <Lottie loop={false} uri={require('../assets/success.json')} />}
                    {state.status === 'Error!' && <Lottie loop={false} uri={require('../assets/fail.json')} />}
                </View>

                <Text style={styles.title}>{state.isSupported ? state.status : 'Dispositivo n suporta nfc'}</Text>

                <TouchableOpacity style={styles.button} onPress={readNdef}>
                    <Text style={styles.text}>Ler Tag</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={writeNdef}>
                    <Text style={styles.text}>Escrever Tag</Text>
                </TouchableOpacity>
                {message && <Text style={styles.title} >{message}</Text>}
                {state.tag && keys.map(item => {
                    if (!state.tag[item]) return null
                    return (
                        <View key={item}>
                            <Text style={styles.item}>{item}</Text>
                            <Text style={styles.item}>{`${!Array.isArray(state.tag[item]) ? state.tag[item] : state.tag[item].map(t => `${t}\n`)}`}</Text>
                        </View>
                    )
                })}
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: 'black',
        gap: 50,
    },
    container: {
        alignItems: 'center',
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    text: {
        color: 'black',
        fontWeight: 'bold',
    },
    button: {
        width: 200,
        backgroundColor: '#FFF',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    containerItems: {
        justifyContent: 'flex-start',
    },
    item: {
        color: '#FFF'
    }
});

export default NFC;