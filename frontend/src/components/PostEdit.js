import React, { useState } from "react";
import PostForm from "./PostForm";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";

export default function PostEdit({ sessionManager, post, showForm }) {
  const navigate = useNavigate();

  const handleClose = () => {
    // reset form vars?

    // hide form
    navigate(`/post/${post.EntryID}`);
  };

  return (
    <Dialog
      open={showForm}
      onClose={handleClose}
      PaperProps={{ sx: { width: 500 } }}
    >
      <DialogTitle>Edit Post</DialogTitle>
      <DialogContent>
        <PostForm
          sessionManager={sessionManager}
          post={post}
          isEditMode={true}
        />
      </DialogContent>
    </Dialog>
  );
}
