import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import SidebarComponent from './components/SidebarComponent';
import HomePage from './pages/HomePage/HomePage';
import MyFriendsPage from './pages/MyFriendsPage/MyFriendsPage'
import LoginPage from './pages/LoginPage/LoginPage'
import GameLobbyPage from './pages/GameLobbyPage/GameLobby'
import MyProfile from './pages/MyProfile/MyProfile'
import {FriendListProvider} from "./pages/MyFriendsPage/FriendListContext";
import FriendProfile from "./pages/FriendProfile/FriendProfile";
import {ToastContainer} from "react-toastify";




const queryClient = new QueryClient();


function App() {
    return (
        <FriendListProvider>
        <div className="App">
            <QueryClientProvider client={queryClient}>
            <Router>
                <div className="content">
                    <ToastContainer
                        position="top-right"
                        autoClose={1500}
                        className="my-toast-container"
                        hideProgressBar={true}
                        // ... other props
                    />
                    <SidebarComponent />
                    <Routes>
                        <Route path="/" exact element={<HomePage />} />
                        <Route path="/friends" element={<MyFriendsPage/>} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/Lobby/:gameId" element={<GameLobbyPage />} />
                        <Route path="/myprofile" element={<MyProfile/>}/>
                        <Route path="/profile/:userName" element={<FriendProfile/>} />
                    </Routes>
                </div>
            </Router>
            </QueryClientProvider>
        </div>
        </FriendListProvider>
    );
}

export default App;

