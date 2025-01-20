import React, { useState, useEffect } from 'react';
import { FlatList, StatusBar, Text, TextInput, View, StyleSheet, Image } from 'react-native';

let originalData = [];
const App = () => {
    const [myData, setMyData] = useState([]);

    useEffect(() => {
        fetch("https://mysafeinfo.com/api/data?list=catbreeds&format=json&case=default")
            .then((response) => response.json())
            .then((myJson) => {
                if (originalData.length < 1) {
                    setMyData(myJson);
                    originalData = myJson;
                }
            });
    }, []);

    const FilterData = (text) => {
        if (text != '') {
            let myFilteredData = originalData.filter((item) =>
                item.BreedName && item.BreedName.includes(text)); // Filter by BreedName
            setMyData(myFilteredData);
        }
        else {
            setMyData(originalData);
        }
    }

    const renderItem = ({ item }) => {
        return (
            <View style={styles.item}>
                <Text style={styles.breed}>{item.BreedName || 'Unknown Breed'}</Text>
                <Text style={styles.detail}>Origin: {item.Origin || 'Unknown'}</Text>
                <Text style={styles.detail}>Origin Location: {item.OriginLocation || 'Unknown'}</Text>
                <Text style={styles.detail}>Coat Type: {item.CoatType || 'Unknown'}</Text>
                <Text style={styles.detail}>ID: {item.ID || 'N/A'}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar />


            <Text style={styles.header}>Cat Breeds Search engine</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => { FilterData(text); }}
                placeholder="Search breeds..."
            />
            <FlatList data={myData} renderItem={renderItem} keyExtractor={(item) => item.ID.toString()} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f0f8ff',
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 20,
    },
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#333',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    item: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: 'green',
    },
    breed: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    detail: {
        fontSize: 14,
        color: '#555',
    },
});

export default App;
