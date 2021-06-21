import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsBug, updateBug } from '../actions/bugActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { BUG_UPDATE_RESET } from '../constants/bugConstants';

export default function BugEditScreen(props) {

    const bugId = props.match.params.id;

    const [bugName, setBugName] = useState('');
    const [bugCategory, setBugCategory] = useState('');
    const [bugLanguage, setBugLanguage] = useState('');
    const [bugReason, setBugReason] = useState('');
    const [bugTestingTool, setBugTestingTool] = useState('');
    const [bugSolution, setBugSolution] = useState('');
    const [bugRefLink, setBugRefLink] = useState('');
    const [bugAddedBy, setBugAddedBy] = useState('');

    const bugDetails = useSelector((state) => state.bugDetails);
    const { loading, error, bug } = bugDetails;

    const bugUpdate = useSelector((state) => state.bugUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = bugUpdate;

    const dispatch = useDispatch();

    useEffect(() => {
        if(successUpdate) {
            props.history.push('/buglist');
        }

        if (!bug || bug._id !== bugId || successUpdate) {
            dispatch({ type: BUG_UPDATE_RESET });
            dispatch(detailsBug(bugId));
        } else {
            setBugName(bug.name);
            setBugCategory(bug.category);
            setBugLanguage(bug.language)
            setBugReason(bug.reason);
            setBugTestingTool(bug.testingTool);
            setBugSolution(bug.solution);
            setBugRefLink(bug.refLink)
            setBugAddedBy(bug.addedBy)
        }
    }, [bug, bugId, dispatch, successUpdate, props.history]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            updateBug({
                _id: bugId,
                bugName,
                bugCategory,
                bugLanguage,
                bugReason,
                bugTestingTool,
                bugSolution,
                bugRefLink,
                bugAddedBy
            })
        )
    };

    return (
        <div>

            <form className="form" onSubmit={submitHandler}>

                <div>
                    <h1>Edit Bug {bugId}</h1>
                </div>

                {loadingUpdate && <LoadingBox></LoadingBox>}
                {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}

                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <>
                        <div>
                            <label htmlFor="name">Name</label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Enter name"
                                value={bugName}
                                onChange={(e) => setBugName(e.target.value)}
                            ></input>
                        </div>

                        <div>
                            <label htmlFor="category">Category</label>
                            <input
                                id="category"
                                type="text"
                                placeholder="Enter category"
                                value={bugCategory}
                                onChange={(e) => setBugCategory(e.target.value)}
                            ></input>
                        </div>

                        <div>
                            <label htmlFor="language">Language</label>
                            <input
                                id="language"
                                type="text"
                                placeholder="Enter language"
                                value={bugLanguage}
                                onChange={(e) => setBugLanguage(e.target.value)}
                            ></input>
                        </div>

                        <div>
                            <label htmlFor="reason">Reason</label>
                            <input
                                id="reason"
                                type="text"
                                placeholder="Enter reason"
                                value={bugReason}
                                onChange={(e) => setBugReason(e.target.value)}
                            ></input>
                        </div>

                        <div>
                            <label htmlFor="testingTool">Testing Tool</label>
                            <input
                                id="testingTool"
                                type="text"
                                placeholder="Enter Testing Tool"
                                value={bugTestingTool}
                                onChange={(e) => setBugTestingTool(e.target.value)}
                            ></input>
                        </div>

                        <div>
                            <label htmlFor="solution">Solution</label>
                            <input
                                id="solution"
                                type="text"
                                placeholder="Enter Solution"
                                value={bugSolution}
                                onChange={(e) => setBugSolution(e.target.value)}
                            ></input>
                        </div>

                        <div>
                            <label htmlFor="refLink">refLink</label>
                            <input
                                id="refLink"
                                type="text"
                                placeholder="Enter refLink"
                                value={bugRefLink}
                                onChange={(e) => setBugRefLink(e.target.value)}
                            ></input>
                        </div>

                        <div>
                            <label htmlFor="addedBy">Added By</label>
                            <input
                                id="addedBy"
                                type="text"
                                placeholder="Enter Added By"
                                value={bugAddedBy}
                                onChange={(e) => setBugAddedBy(e.target.value)}
                            ></input>
                        </div>

                        <div>
                            <label></label>
                            <button className="primary" type="submit">
                                Update
                            </button>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
}
