import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import type { CustomerForm } from '../types';
import { saveCustomer } from '../customerApi';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';

type AddCustomerProps = {
    fetchCustomers: () => void;
}

export default function AddCustomer({ fetchCustomers }: AddCustomerProps) {
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState<CustomerForm>({
        firstname: "",
        lastname: "",
        streetaddress: "",
        postcode: "",
        city: "",
        email: "",
        phone: "",
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCustomer({
            firstname: "",
            lastname: "",
            streetaddress: "",
            postcode: "",
            city: "",
            email: "",
            phone: "",
        });
    };

    const handleSave = () => {
        if (!customer.firstname || !customer.lastname) {
            alert("Enter values first");
            return;
        }

        saveCustomer(customer)
            .then(() => {
                fetchCustomers();
                handleClose();
            })
            .catch(err => console.error(err))
    }

    return (
        <>
            <IconButton size="small" onClick={handleClickOpen} sx={{ fontFamily: 'Arial', fontSize: '0.9rem', fontWeight: '600' }}>
                <AddBoxIcon /> Customer
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add new customer</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        required
                        label="First Name"
                        value={customer.firstname}
                        onChange={event => setCustomer({ ...customer, firstname: event.target.value })}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        required
                        label="Last Name"
                        value={customer.lastname}
                        onChange={event => setCustomer({ ...customer, lastname: event.target.value })}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        label="Street Address"
                        value={customer.streetaddress}
                        onChange={event => setCustomer({ ...customer, streetaddress: event.target.value })}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        label="Postcode"
                        value={customer.postcode}
                        onChange={event => setCustomer({ ...customer, postcode: event.target.value })}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        label="City"
                        value={customer.city}
                        onChange={event => setCustomer({ ...customer, city: event.target.value })}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        label="Email"
                        type="email"
                        value={customer.email}
                        onChange={event => setCustomer({ ...customer, email: event.target.value })}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        label="Phone"
                        value={customer.phone}
                        onChange={event => setCustomer({ ...customer, phone: event.target.value })}
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
