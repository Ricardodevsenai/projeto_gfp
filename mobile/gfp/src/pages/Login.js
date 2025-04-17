import {View, Text,Button} from 'react-native';

function Login({navigation}) {
    return (
        <View>
            <Text>Login</Text>
            <Button title="Entrar" onPress={() => navigation.navigate('MenuDrawer')}/>
        </View>
    );
}

export default Login;