import { Notify } from 'quasar'


export default function notify() {

    function errorNotify(message: string) {
      Notify.create({
        message,
        color: 'negative',
        icon: 'warning'
      })
    }
    function successNotify(message: string) {
      Notify.create({
        message,
        color: 'positive',
        icon: 'check_circle'
      })
    }
    return { errorNotify, successNotify }
}
