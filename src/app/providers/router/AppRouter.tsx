import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthPage, CalendarPage, DashBoardPage, ProfilePage, TasksPage } from '@/pages';
import { MainLayoutContainer } from '@/widgets/Layout/MainLayotContainer';
import { AuthLayout } from '@/widgets/Layout/OutLayout';
import { LandingPage } from '@/pages/LandingPage';
import { LoginPage } from '@/pages/LoginPage';

export const AppRouter = () => {
    const isAuth = true;

    return (
        <Routes>
            <Route element={<AuthLayout />}>
                <Route path="/landing" element={<LandingPage />} /> {/* */}
                <Route path="/login" element={<LoginPage />} /> {/* */}
                <Route path="/register" element={<LoginPage />} />
            </Route>

            {isAuth ? (
                <Route path="/" element={<MainLayoutContainer />}> {/* Design done */}
                    <Route index element={<Navigate to="/tasks" replace />} />
                    <Route path="/tasks" element={<TasksPage />} /> {/* Design done */}
                    <Route path="/calendar" element={<CalendarPage />} /> {/* */}
                    <Route path="/dashboard" element={<DashBoardPage />} /> {/* */}
                    <Route path="/profile" element={<ProfilePage />} /> {/* */}
                </Route>
            ) : (
                <Route path="*" element={<Navigate to="/landing" replace />} />
            )}
        </Routes>
    );
};