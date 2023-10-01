import { Dispatch } from "redux";
import { appActions } from "app/app.reducer";
import { BaseResponseType } from "common/types/common.types";

/**
 * Обрабатывает ошибки, полученные от сервера
 *
 * @param data  - Объект ответа от сервера, содержащий информацию об ошибке и другие данные (типизированный).
 * @param dispatch - Функция для отправки действий в хранилище Redux или аналогичном контейнере состояния приложения.
 * @param showError - Флаг, определяющий, нужно ли отображать сообщение об ошибке для пользователя (по умолчанию true).
 * @returns void - Функция не возвращает значения.
 */
export const handleServerAppError = <D>(
  data: BaseResponseType<D>,
  dispatch: Dispatch,
  showError: boolean = true,
): void => {
  // Проверяем, нужно ли отображать сообщение об ошибке пользователю.
  if (showError) {
    // Если сервер вернул сообщение об ошибке, используем его, иначе выводим общее сообщение.
    dispatch(appActions.setAppError({ error: data.messages.length ? data.messages[0] : "Some error occurred" }));
  }

  // Устанавливаем статус приложения в "failed" для обозначения неудачной операции.
  dispatch(appActions.setAppStatus({ status: "failed" }));
};

// /**
//  * {@link https://stackoverflow.com/a/35548142 GitHub}
//  */
// function downloadContent(name: string, content: any) {
//   var atag = document.createElement("a");
//   var file = new Blob([content], { type: "text/plain" });
//   atag.href = URL.createObjectURL(file);
//   atag.download = name;
//   atag.click();
// }
//
// downloadContent("t1.txt", "hello world");
