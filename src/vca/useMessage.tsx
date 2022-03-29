/**
 *  created by wenxiao.li
 *  Date: 2021/6/9
 *  Time: 19:35
 *  Version: 1.0
 *  For: 消息,通知
 */
import { message as Message, Modal } from 'ant-design-vue';
import {
  InfoCircleFilled, CheckCircleFilled, WarningOutlined, ExclamationCircleOutlined,
} from '@ant-design/icons-vue';

export function useMessage() {

  const baseOptions = {
    okText: '确定',
    centered: true,
    maskClosable: true,
    width: 500,
  };

  function renderContent({ content }) {
    return <div innerHTML={`<div>${content}</div>`}></div>;
  }

  function getIcon(iconType: string) {
    if (iconType === 'warning') {
      return <WarningOutlined class="modal-icon-warning" />;
    } if (iconType === 'success') {
      return <CheckCircleFilled class="modal-icon-success" />;
    } if (iconType === 'confirm') {
      return <ExclamationCircleOutlined class="modal-icon-confirm" />;
    }
    return <InfoCircleFilled class="modal-icon-info" />;

  }

  function createModalOptions(options, icon: string) {
    return {
      ...baseOptions,
      ...options,
      content: renderContent(options),
      icon: getIcon(icon),
    };
  }

  function createInfoModal(options) {
    return Modal.info(createModalOptions({
      ...options,
      class: 'info-modal',
    }, 'info'));
  }
  function createConfirmModal(options) {
    return Modal.confirm(createModalOptions(options, 'confirm'));
  }
  function createWarningModal(options) {
    return Modal.warning(createModalOptions(options, 'warning'));
  }

  return {
    createMessage: Message,
    createInfoModal,
    createWarningModal,
    createConfirmModal,
  };
}
