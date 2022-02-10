import React from 'react';
import { Switch, Route } from "react-router-dom"
import AdminLogin from '../../pages/admin-login/AdminLogin';
import AdminManage from '../../pages/adminManage/AdminManage';
import Detail from '../../pages/detail/Detail';
import FavoritesPage from '../../pages/Favorites-page/FavoritesPage';


import Home from '../../pages/home/Home';
import Mp3Detail from '../../pages/mp3-detail/Mp3Detail';
import Mp3Page from '../../pages/mp3-page/Mp3Page';
import NewsPage from '../../pages/news/NewsPage';
import SearchPage from '../../pages/search-page/SearchPage';
import TopLoved from '../../pages/top-loved/TopLoved';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import NotFound from '../NotFound/NotFound';



const AllRouter = () => {
    return (
        <Switch>
            <Route exact path="/admin" component={AdminLogin} />
            <Route exact path="/mp3/:folder" component={Mp3Detail} />
            <Route path="/admin/manage/" component={AdminManage} />
            <Route path="/">
                <Header />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/detail/:id" component={Detail} />
                    <Route exact path="/search" component={SearchPage} />
                    <Route exact path="/favorites-list" component={FavoritesPage} />
                    <Route exact path="/news/:id" component={NewsPage} />
                    <Route exact path="/top-loved" component={TopLoved} />
                    <Route exact path="/mp3" component={Mp3Page} />
                    <Route path="*" component={NotFound} />
                </Switch>
                <Footer />
            </Route>
        </Switch>
    );
};

export default AllRouter;