export class ToastService {
  static notify(
    message: string | Object,
    type: 'success' | 'warning' | 'info' | 'error' = 'info',
    delay: number = 3000
  ) {
    if (!message) {
      return;
    }

    const msg = typeof message === 'object' ? JSON.stringify(message) : message;

    const notificationId = 'AB5EE3A9CE0994F83D061B1646B5283F';
    const notificaitonStyle = `position:fixed;max-height:400px;overflow:auto;width:300px;left:calc(50% - 150px);top:10px;z-index:10000;`;
    const messageStyle = `width:100%;padding:10px 15px;font-size:13px;border-radius:4px;text-align:left;
        position:relative;margin-bottom:10px;animation:fadeleftIn .4s;animation-name: popupAnimation;
        white-space:normal;overflow:auto;word-break: break-word;`;
    const closeButtonStyle =
      'position:absolute;right:3px;top:-2px;color:#fff;display:inline-block;font-size:18px;font-weight:bold;cursor:pointer;';
    const getMessageStyle = (type: string) => {
      switch (type) {
        case 'success':
          return messageStyle + 'color:white;background-color:#3aae70;';
        case 'warning':
          return messageStyle + 'color:#fff;background-color:#ee8845;';
        case 'info':
          return messageStyle + 'color:white;background-color:#3182ce;';
        case 'error':
          return messageStyle + 'color:#fff;background-color:#f85b5b;';
        default:
          return messageStyle + 'color:#fff;background-color:#3182ce;';
      }
    };

    let box: HTMLElement = document.getElementById(
      notificationId
    ) as HTMLElement;
    if (!box) {
      box = document.createElement('div');
      box.id = notificationId;
      box.style.cssText = notificaitonStyle;
      document.body.appendChild(box);
    }

    delay = delay < 1000 ? 1000 : delay > 60000 ? 60000 : delay;
    const msgBox: HTMLDivElement = document.createElement('div');
    const closeButton = document.createElement('span');
    let autoRemoveTimer = setTimeout(() => {
      try {
        box.removeChild(msgBox);
      } catch (err) {
        console.log(err);
      }
    }, delay);

    msgBox.style.cssText = getMessageStyle(type);
    msgBox.innerText = msg;
    msgBox.onmouseover = () => window.clearTimeout(autoRemoveTimer);
    msgBox.onmouseout = () => {
      autoRemoveTimer = setTimeout(() => {
        try {
          box.removeChild(msgBox);
        } catch (err) {
          console.log(err);
        }
      }, delay);
    };
    closeButton.style.cssText = closeButtonStyle;
    closeButton.innerText = '×';
    closeButton.onclick = () => {
      try {
        window.clearTimeout(autoRemoveTimer);
        box.removeChild(msgBox);
      } catch (err) {
        console.log(err);
      }
    };
    msgBox.appendChild(closeButton);
    box.appendChild(msgBox);
  }
}
