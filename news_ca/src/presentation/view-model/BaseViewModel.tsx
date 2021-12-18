import BaseView from '../view/BaseView';

interface BaseViewModel {
    attachView(baseView : BaseView): void;
    detachView(): void;
}

export default BaseViewModel;
