import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import type { TrainingSessionForm } from '../types';
import { saveTraining } from '../trainingapi';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';

type AddTrainingProps = {
    fetchTraining: () => void;
}

export default function AddTraining({ fetchTraining }: AddTrainingProps) {
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState<TrainingSessionForm>({
        date: "" as unknown as Date,
        duration: 0,
        activity: "",
    });


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setTraining({
            date: "" as unknown as Date,
            duration: 0,
            activity: "",
        });
    };

    const handleSave = () => {
        if (!training.date || !training.duration || !training.activity) {
            alert("Enter values first");
            return;
        }

        saveTraining(training)
            .then(() => {
                fetchTraining();
                handleClose();
            })
            .catch(err => console.error(err));

    };


    return (
        <>
            <IconButton size="small" onClick={handleClickOpen} sx={{ fontFamily: 'Arial', fontSize: '0.9rem', fontWeight: '600' }}>
                <AddBoxIcon /> Training
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add new training</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        required
                        type="datetime-local"
                        value={training.date}
                        onChange={event => setTraining({ ...training, date: event.target.value as unknown as Date })}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        required
                        label="Duration (minutes)"
                        type="number"
                        value={training.duration}
                        onChange={event => setTraining({ ...training, duration: Number(event.target.value) })}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        required
                        label="Activity"
                        value={training.activity}
                        onChange={event => setTraining({ ...training, activity: event.target.value })}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
