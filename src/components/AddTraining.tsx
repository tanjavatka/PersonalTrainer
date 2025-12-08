import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import type { TrainingSessionForm } from '../types';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';

import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


type AddTrainingProps = {
    handleSaveTraining: (t: TrainingSessionForm) => Promise<void>;
    customerUrl: string;
}

export default function AddTraining({ handleSaveTraining, customerUrl }: AddTrainingProps) {
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState<TrainingSessionForm>({
        date: "",
        duration: 0,
        activity: "",
        customer: customerUrl,
    });


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setTraining({
            date: "",
            duration: 0,
            activity: "",
            customer: customerUrl,
        });
    };

    const handleSave = () => {
        if (!training.date || !training.duration || !training.activity) {
            alert("Enter required values first");
            return;
        }

        handleSaveTraining(training)
            .then(() => {
                handleClose();
            })
            .catch(err => console.error(err));

    };

    // const formatDate = (dateString: string) => {
    //     return dayjs(dateString).format("DD.MM.YYYY HH:mm");
    // };

    return (
        <>
            <IconButton size="small" onClick={handleClickOpen} sx={{ fontFamily: 'Arial', fontSize: '0.9rem', fontWeight: '600' }}>
                <AddBoxIcon /> Training
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add new training</DialogTitle>
                <DialogContent>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            label="Date & Time"
                            format="DD-MM-YYYY HH:mm"
                            value={training.date ? dayjs(training.date) : null}
                            onChange={(newValue) => {
                                setTraining({
                                    ...training,
                                    date: newValue ? newValue.format('') : ''
                                });
                            }}
                        />
                    </LocalizationProvider>

                    {/* <TextField
                        margin="dense"
                        required
                        type="datetime-local"
                        value={training.date}
                        onChange={event => setTraining({ ...training, date: event.target.value })}
                        fullWidth
                        variant="standard"
                    /> */}

                    <TextField
                        margin="dense"
                        required
                        label="Duration (minutes)"
                        type="number"
                        value={training.duration === 0 ? '' : training.duration}
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
                    <Button onClick={handleClose}> Cancel </Button>
                    <Button onClick={handleSave}> Save </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
