<?php
require_once DISK_ROOT.'/lib/mvc/config.php';
require_once DISK_ROOT.'/lib/mvc/IResultSupport.php';
class RedirectResult implements IResultSupport {
	function doResult($objAction,$arrResultParams,$arrData=array(),$objEngine=null) {
		require_once SMATY_LIB.'Smarty.class.php';
		$smarty = new Smarty(); //����smartyʵ�����$smarty
		$smarty->template_dir = DISK_ROOT.TEMPLATE_DIR; //����ģ��Ŀ¼
		$smarty->compile_dir = DISK_ROOT.COMPILE_DIR; //���ñ���Ŀ¼
		$smarty->cache_dir = DISK_ROOT.CACHE_DIR; //����Ŀ¼
		$smarty->cache_lifetime = CACHE_LIFETIME; //����ʱ��
		$smarty->caching = CACHING; //���淽ʽ
		$smarty->left_delimiter = LEFT_DELIMITER;
		$smarty->right_delimiter = RIGHT_DELIMITER;
		$arrFunction = get_class_methods($objAction);
		$arrPageInfoData=$objAction->getPageInfo();
		foreach ($arrPageInfoData as $key => $value) {
			$smarty->assign($key, $value);
		}
		$smarty->assign("basePath", DISK_ROOT);
		$smarty->assign("host", HOST);
		$tplPath = $arrResultParams['value'];
		$tplPath = strval($tplPath);
		$smarty->display($tplPath);

	}
}