import { createDrawerNavigator } from "@react-navigation/drawer";
import Principal from "./Principal";
import Contas from "./Contas";

const Drawer = createDrawerNavigator();

export default function MenuDrawer() {
    return (
        <Drawer.Navigator screenOptions={{ headerStyle: { backgroundColor: "#f4511e",elevation:0},headerTintColor: "#fff" }}>
            
        <Drawer.Screen name="Principal" component={Principal} />
        <Drawer.Screen name="Contas" component={Contas} />
        </Drawer.Navigator>
    );
}