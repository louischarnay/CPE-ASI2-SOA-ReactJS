import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import User from "../../models/user.model";

const ChatSelector = ({targetList} : {targetList:User[]}) => {

    const targetId: number = useSelector((state: any) => state.messageReducer.targetId);
    const typeChat: string = useSelector((state: any) => state.messageReducer.typeChat);
    const dispatch = useDispatch();

    const updateTypeChat = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: 'UPDATE_TYPE_CHAT', payload: e.target.value });
        dispatch({ type: 'EMPTY_MESSAGES' });
        if (e.target.value === "private") {
            dispatch({ type: 'UPDATE_TARGET_ID', payload: 0 });
        }
    }, [dispatch]);

    return (
        <>
            <div className="chat-child chat-type-selector">
                <div className="radio-group">
                    <div className="radio-option">
                        <input
                            type="radio"
                            name="typeChat"
                            id="typeChatGlobal"
                            value="global"
                            onChange={updateTypeChat}
                            checked={typeChat === "global"}
                        />
                        <label htmlFor="typeChatGlobal">Global Chat</label>
                    </div>

                    <div className="radio-option">
                        <input
                            type="radio"
                            name="typeChat"
                            id="typeChatPrivate"
                            value="private"
                            onChange={updateTypeChat}
                            checked={typeChat === "private"}
                        />
                        <label htmlFor="typeChatPrivate">Private Chat</label>
                    </div>
                </div>
            </div>
            <div>
                {typeChat === "private" && (
                    <FormControl fullWidth variant="filled" margin="normal">
                        <InputLabel>Select Target</InputLabel>
                        <Select
                            value={targetId || ""}
                            onChange={(e: any) => {
                                const newTargetId = e.target.value as number;
                                dispatch({
                                    type: 'UPDATE_TARGET_ID',
                                    payload: newTargetId,
                                });
                            }}
                        >
                            {targetList.map((target) => (
                                <MenuItem key={target.id} value={target.id}>
                                    {target.surName} {target.lastName} ({target.login})
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}
            </div>
        </>
    )
}

export default ChatSelector;