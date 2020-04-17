export default function vhTOpx(value) {
    const y =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.getElementsByTagName('body')[0].clientHeight;

    return (y * value)/100;
}
