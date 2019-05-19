import Swal from 'sweetalert2';

export class Messages {

    error(message: string, title: string = 'Ooops') {
        Swal.fire({
            title: title,
            text: message,
            type: 'error'
        });
    }

    success(message: string, title: string = '') {
        Swal.fire({
            title: title,
            text: message,
            type: 'success'
        });
    }

    warning(message: string, title: string = '') {
        Swal.fire({
            title: title,
            text: message,
            type: 'warning'
        });
    }

    info(message: string, title: string = '') {
        Swal.fire({
            title: title,
            text: message,
            type: 'info'
        });
    }

    qestion(message: string, title: string = '') {
        Swal.fire({
            title: title,
            text: message,
            type: 'question'
        });
    }

}
