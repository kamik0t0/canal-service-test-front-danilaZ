Инструкция по эксплуатации:

1. Сортировка осуществляется путем клика по наименованию ячеек - указатель должен поменять форму. Второй клик инвертирует порядок сортировки.
2. Фильтрация осуществляется по двум полям: в выпадающем списке "выбрать колонку" выбирается фильтруемый столбец, в "условие" - условие фильтрации. В поле "начинайте вводить..." вводится фильтруюий текст. По умолчанию фильтрация осуществляется по названию и содержанию.
3. Отклик приложения не моментальнй поскольку внедрен "тормозящий декоратор" с целью сокращения количества лишних перерисовок.
4. Верстка на flex, поэтому приложение может до некоторой степени изменять размер сохраняя пропорции, но без медиа запросов.
5. Реализовал также количество отображаемых страниц, поскольку напрашивалось. Более того это продемонстрирует динамический расчет пагинации.
6. На случай если с сервера не последует ответа, то будут подставлены фейковые данные и на первой странице первой стройки колонки "Название" вы увидите "fake Монако" вместо "Монако" и в логи должна вывалиться ошибка, но приложение тем не менее сохранит работоспособность.
7. Если количество строк будет больше чем способно отобразить окно, то появится возможность прокрутки (при перемещении курсора вправо появится полоса стилизованная полоса прокрути).
8. Работоспособность приложения проверена в Chrome, Mozilla, Microsoft Edge.
9. Дополнительные комментарии в т.ч. с использованием JSdoc непосредственно в коде.
