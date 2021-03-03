import React, {useEffect, FC, SyntheticEvent, useState} from "react";
import {Link, useHistory, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import { toastr } from "react-redux-toastr";
import {generalCRUD} from "../../../actions/generalCRUD";


import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

import DotsMenu from "../../../assets/images/dots-menu.svg";


// Components
import MainTemplate from "../MainTemplate";
import ModalWindow from "../../molecules/ModalWindow";
import TopPartPage from "../../molecules/TopPartPage";
import LoaderLocal from "../../atoms/LoaderLocal";

// Styles
import "./style.scss";


type editModalType = {
    status: boolean;
    index: number;
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

const FeedsContainer: FC = props => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<editModalType>({
        status: false,
        index: 0,
    });
    const [feedList, setFeedList] = useState<Array<feedItemType>>([]);
    const [deleteModal, setDeleteModal] = useState<editModalType>({
        status: false,
        index: 0,
    });
    const [feedItem, setFeedItem] = useState<feedItemType>(feedInitial);
    const history = useHistory();

    // to get all entities
    useEffect(() => {
        getAllFeeds();
    }, []);

    const getAllFeeds = async () => {
        setIsLoading(true);

        const response = await generalCRUD.getAllFeeds("posts");
        if (response.status === 200) {
            setFeedList(response.data.slice(0, 3));
        } else {
            toastr.error("Error", "");
        }
        setIsLoading(false);
    }

    const openEditModal = (data: feedItemType, index: number): void => {
        setEditModal({
            status: true,
            index: index,
        });
        setFeedItem(data);
    };

    const openDeleteModal = (data: feedItemType, index: number): void => {
        setDeleteModal({
            status: true,
            index: index,
        });
        setFeedItem(data);
    };

    const closeModal = (): void => {
        setFeedItem(feedInitial);
        isAddModalOpen
            ? setIsAddModalOpen(false)
            : setEditModal({
                ...editModal,
                status: false,
            });
        setDeleteModal({
            ...deleteModal,
            status: false,
        });
    };

    const addEntity = async () => {

        const handleSuccess = () => {
            getAllFeeds();
            toastr.success("New Feed was added successfully", "");
            closeModal();
        };
        sendRequest(handleSuccess, feedItem, false);
    };

    const editEntity = (index: number): void => {
        const handleSuccess = () => {
            const newData: Array<feedItemType> = [...feedList];
            newData[index] = { ...feedItem };
            setFeedList(newData);
            toastr.success("Your Feed was edited successfully", "");
            closeModal();
        };
        sendRequest(handleSuccess, feedItem, true);
    };

    const deleteEntity = (index: number): void => {
        sendRequestDelete();
    };

    const sendRequestDelete = async () => {
        closeModal();
        const response = await generalCRUD.deleteFeed("posts", feedItem.id);
        if (response) {
            toastr.success("Feed was deleted successfully", "");
        } else {
            return toastr.error("Error", "");
        }
    };

    const textChangeHandler = (event: SyntheticEvent, field: string, num?: boolean | string) => {
        const value = (event.target as HTMLInputElement).value;
        if (value.length < 0) return false;
        const newData = {
            ...feedItem,
            [field]: value,
        };
        setFeedItem(newData);
    };

    const sendRequest = async (handleSuccess: () => void, data: feedItemType, forEdit?: boolean) => {
        setIsLoading(true);
        let response;
        if (forEdit) {
            response = await generalCRUD.editFeed("posts", feedItem.id, feedItem);
        } else {
            response = await generalCRUD.addFeed("posts", feedItem);
        }

        if (response) {
            handleSuccess();
        } else {
            return toastr.error("Error", "");
        }
        closeModal();
        return setIsLoading(false);
    };

    const modalContent = (
        <>
            <div className="unit-wrap">
                <div className="unit">
                    <p className="sub-title">Title</p>
                    <div>
                        <TextField
                            value={feedItem.title}
                            placeholder="title"
                            type="text"
                            onChange={(event) => textChangeHandler(event, "title", false)}
                        />
                    </div>
                </div>
            </div>
            <div className="unit-wrap">
                <div className="unit">
                    <p className="sub-title">Body</p>
                    <div>
                        <TextField
                            value={feedItem.body}
                            placeholder="body"
                            type="text"
                            onChange={(event) => textChangeHandler(event, "body", false)}
                        />
                    </div>
                </div>
            </div>
        </>
    );

    return (
        <MainTemplate>
            <main id="main" className="main">
                <div id="feeds" className="page-container">
                    <TopPartPage title="Feeds" buttonTitle="Add new feed" handleClick={() => setIsAddModalOpen(true)} />
                    <div className="table-thead">
                        <div className="th small">Id</div>
                        <div className="th small">User Id</div>
                        <div className="th">Title</div>
                        <div className="th small">Action</div>
                    </div>
                    <ul className="table-content">
                        {feedList.map((item: feedItemType, index) => {
                            return (
                                <li className="table-content-item" key={index}>
                                    <Link className="th small" to={`/feed/${item.id}`}>
                                        <div>{item.id}</div>
                                    </Link>
                                    <Link className="th small" to={`/feed/${item.id}`}>
                                        <div>{item.userId}</div>
                                    </Link>
                                    <Link className="th" to={`/feed/${item.id}`}>
                                        <div>{item.title}</div>
                                    </Link>
                                    <div className="th small">
                                        <FormControl>
                                            <img src={DotsMenu} className="dots-position" alt="dots-menu" />
                                            <Select value={""} displayEmpty>
                                                <MenuItem onClick={() => openEditModal(item, item.id)}>Edit</MenuItem>
                                                <MenuItem className="delete-client-item" onClick={() => openDeleteModal(item, item.id)}>
                                                    Delete
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                    {isLoading && <LoaderLocal/>}
                </div>
                <ModalWindow
                    open={isAddModalOpen}
                    handleClose={closeModal}
                    handleSubmit={addEntity}
                    title="New feed"
                    classes="feed-modal"
                    description="You can add a new feed"
                >
                    {modalContent}
                </ModalWindow>
                <ModalWindow
                    open={editModal.status}
                    handleClose={closeModal}
                    handleSubmit={() => editEntity(editModal.index)}
                    title="Edit feed`s information"
                    classes="feed-modal"
                    description="You can edit feed`s information"
                >
                    {modalContent}
                </ModalWindow>
                <ModalWindow
                    open={deleteModal.status}
                    handleClose={closeModal}
                    handleSubmit={() => deleteEntity(deleteModal.index)}
                    title="Delete feed"
                    description="Attention!"
                >
                    {}
                </ModalWindow>
            </main>
        </MainTemplate>
    );
};

const mapStateToProps = function (state: any) {
    return {
        app: state.app
    };
};

export default connect(mapStateToProps)(withRouter(FeedsContainer));
