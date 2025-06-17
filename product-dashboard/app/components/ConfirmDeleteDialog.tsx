import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

// Defining the props interface for the ConfirmDeleteDialog component
interface ConfirmDeleteDialogProps {
  open: boolean;             // Determines whether the dialog is open or closed
  onClose: () => void;       // Callback for closing the dialog
  onConfirm: () => void;     // Callback for confirming the delete action
  itemName: string | undefined; // Name of the item to be deleted (optional)
}

export function ConfirmDeleteDialog({
  open,
  onClose,
  onConfirm,
  itemName,
}: ConfirmDeleteDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        Are you sure you want to delete <strong>{itemName}</strong>? This action
        cannot be undone.
      </DialogContent>
      <DialogActions sx={{ paddingY: 2, borderTop: "1px solid" }}>
        {/* Button to cancel the action and close the dialog */}
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        {/* Button to confirm the deletion */}
        <Button onClick={onConfirm} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
