import React, { useEffect, useState, FC } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {generalCRUD} from "../../../actions/generalCRUD";
import helpFunctions from "../../../tools/helpFunctions";

// Components
import MainTemplate from "../MainTemplate";
import LoaderLocal from "../../atoms/LoaderLocal";
import TopPartPage from "../../molecules/TopPartPage";

import {Card} from "@material-ui/core";
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';

// Styles
import "./style.scss";
import {toastr} from "react-redux-toastr";

type userType = {
    user: any;
};

type feedItemType = {
    userId: number;
    id: number;
    title: string;
    body: string
};

const feedInitial = {
    userId: 0,
    id: 0,
    title: "",
    body: "",
};

const FeedContainer: FC<any> = (props: userType) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [feedItem, setFeedItem] = useState<feedItemType>(feedInitial);

    useEffect(() => {
        getFeed();
    }, []);

    const getFeed = async () => {
        setIsLoading(true);
        const feedId = parseInt(helpFunctions.getParamIdFromUrl(), 10);
        const response = await generalCRUD.getFeed("posts", feedId);
        if (response.status === 200) {
            setFeedItem(response.data);
        } else {
            toastr.error("Error", "");
        }
        setIsLoading(false);
    };

    return (
        <MainTemplate>
            <main id="main" className="main">
                <div id="feed" className="page-container">
                    <TopPartPage title="Feed" buttonTitle="Do Magic" handleClick={() => window.location.reload()} />
                    <div className="feed-wrapper">
                        <Card>
                            <img src="https://loremflickr.com/g/320/240/cat"
                                 title="Random cat img"
                                 alt="Random cat img"
                                 width="320"
                                 height="240"
                                 className="img"
                            />
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {feedItem.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {feedItem.body}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites">
                                    <FavoriteIcon />
                                </IconButton>
                                <IconButton aria-label="share">
                                    <ShareIcon />
                                </IconButton>
                                <Typography variant="body2" color="textSecondary" component="button">
                                    Author: {feedItem.userId}
                                </Typography>
                            </CardActions>
                        </Card>
                    </div>
                </div>
                {isLoading && <LoaderLocal />}
            </main>
        </MainTemplate>
    );
};

const mapStateToProps = function(state: any) {
    return {
        app: state.app,
        user: state.user,
    };
};

export default connect(mapStateToProps)(withRouter(FeedContainer));
