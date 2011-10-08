<?php
require_once 'Common.php';
require_once 'config.php';
require_once 'Util.php';
require_once 'Properties.php';
require_once 'Exception.php';
//自定义异常处理方法
set_exception_handler('slefExceptionHandler');
/**
 *MVC核心类
 */
class CoreEngine {
	public function __construct() {
	}
	public function execute() {
		$requestURI = $_SERVER["REQUEST_URI"];
		//解析请求URI
		$arrResult = Common :: parseURI($requestURI);
		$packageName = $arrResult["packageName"];
		$actionName = $arrResult["actionName"];
		$arrData = $arrResult["data"];
		$this->doAction($packageName, $actionName, $arrData);

	}

	/**
	 *parseXML		   					解析xml配置文件
	 *$cofigXml    	   					配置文件
	 *$isRecursive  	  					是否递归解析
	 *$arrPackages   					所有的配置包
	 *$arrIntercepters 					所有的拦截器
	 *$arrCustomerConfig 			所有的用户自定义设置 将覆盖默认配置文件中的相同设置
	 */
	public function parseXML($cofigXml, $isRecursive, & $arrPackages, & $arrIntercepters, & $arrCustomerConfig) {
		if (!empty ($cofigXml->customerConfig)) {
			foreach ($cofigXml->customerConfig as $customerConfig) {
				if (!in_array($customerConfig, $arrCustomerConfig)) {
					$arrCustomerConfig[] = $customerConfig;
				}

			}
		}
		if (!empty ($cofigXml->intercepters)) {
			foreach ($cofigXml->intercepters->intercepter as $interceptor) {
				$arrIntercepters[] = $interceptor;
			}
		} else {
		}
		if (!empty ($cofigXml->package)) {
			foreach ($cofigXml->package as $package) {
				$arrPackages[] = $package;
			}
		}
		if (!$isRecursive) {
			return;
		} else {
		}
		$arrIncludeXML = array ();

		if (!empty ($cofigXml->include)) {
			foreach ($cofigXml->include as $include) {
				$arrIncludeXML[] = $include;
			}
		}
		foreach ($arrIncludeXML as $includeXML) {
			$strFilePath = strval($includeXML["file"]);
			$strFilePath = DISK_ROOT . '/' . $strFilePath;
			if (!file_exists($strFilePath)) {
				throw new FileLoadException($strFilePath);
			}
			$cofigXml = simplexml_load_file($strFilePath);
			$this->parseXML($cofigXml, true, $arrPackages, $arrIntercepters, $arrCustomerConfig);
		}

	}
	/**
	 *执行相应的Action
	 *$packageName 包名
	 *$actionName      Action名
	 *$arrData				用户请求的数据
	 *$preAction			前一个Action
	 */
	public function doAction($packageName, $actionName, $arrData, $preAction = null) {
		$arrPackages = array ();
		$arrIntercepters = array ();
		$arrCustomerConfig = array ();
		//载入默认的mvc配置文件
		if (file_exists('china_mvc.xml')) {
			$cofigXml = @ simplexml_load_file("china_mvc.xml");

		} else {
			throw new FileLoadException('china_mvc.xml');
		}
		//解析xml
		$this->parseXML($cofigXml, true, $arrPackages, $arrIntercepters, $arrCustomerConfig);
		$this->parseXML($cofigXml, false, $arrPackages, $arrIntercepters, $arrCustomerConfig);
		$package = null;
		$hasFind = false;
		foreach ($arrPackages as $basePackage) {
			if ($basePackage["name"] == $packageName) {
				$package = $basePackage;
				$hasFind = true;
				break;
			} else {
			}
		}
		if (!$hasFind) {
			foreach ($arrPackages as $basePackage) {
				if (empty ($basePackage["name"])) {
					$package = $basePackage;
					break;
				} else {
				}
			}
		} else {
		}
		if (!isset ($package)) {
			throw new RequestPathException();
		}
		$action = null;
		if (!empty ($package->action)) {
			foreach ($package->action as $baseAction) {
				if ($baseAction["name"] == $actionName) {
					$action = $baseAction;
					break;
				} else {
				}
			}
		}
		if (!isset ($action)) {
			throw new RequestPathException();
		}
		$phpPath = $action["php"];
		$arrPhpPath = explode("/", $phpPath);
		$phpName = $arrPhpPath[count($arrPhpPath) - 1];
		$className = $action["class"];
		if (empty ($className)) {
			$className = $phpName;
		}
		$functionName = $action["function"];
		if (empty ($functionName)) {
			$functionName = "index";
		}
		$className = strval($className);

		$languagePacksPath = DISK_ROOT . substr($phpPath, 0, Util :: strLastPos($phpPath, '/'));

		$phpPath = DISK_ROOT . $phpPath . ".php";

		if (file_exists($phpPath)) {
			@ require_once ($phpPath);

		} else {
			throw new PhpIncludeException($phpPath);
		}

		if (class_exists($className)) {
			$objAction = @ new $className ();

		} else {
			throw new ClassLoadException($phpPath . '------->' . $className);
		}

		//载入全局信息資源
		$arrGlobalLanguagePacks = array ();
		foreach ($arrCustomerConfig as $customerConfig) {
			if (empty ($customerConfig->globalLanguagePacks) || empty ($customerConfig->globalLanguagePacks->globalLanguagePack)) {
				continue;
			}
			foreach ($customerConfig->globalLanguagePacks->globalLanguagePack as $globalLanguagePack) {
				if (empty ($globalLanguagePack['name'])) {
					continue;
				}
				$arrGlobalLanguagePacks[] = $globalLanguagePack;
				$globalLanguagePackPath = $globalLanguagePack['path'];
				if (empty ($globalLanguagePackPath)) {
					$globalLanguagePackPath = "";
				}
				if (!file_exists(DISK_ROOT . $globalLanguagePackPath)) {
					throw new DirLoadException(DISK_ROOT . $globalLanguagePackPath);
				}
				$arrLanguagePacks = Util :: traversalDir(DISK_ROOT . $globalLanguagePackPath);
				$languageFileExit = false;
				foreach ($arrLanguagePacks as $languagePack) {
					$languagePackName = $languagePack;
					if (Util :: strStartWith($languagePack, trim($globalLanguagePack['name'])) && Util :: strEndWith($languagePack, '.lgp')) {
						$languageFileExit = true;
						$languagePack = substr($languagePack, 0, -4);
						$languageLeval = 'global_';
						$languageSort = '';
						$languageCountry = '';
						$arrTemp = explode('_', $languagePack);
						if (count($arrTemp) == 2) {
							$languageSort = $arrTemp[1];
						}
						elseif (count($arrTemp) == 3) {
							$languageSort = $arrTemp[1];
							$languageCountry = $arrTemp[2];
						} else {
						}
						$languageProperties = new Properties(DISK_ROOT . $globalLanguagePackPath . '/' . $languagePackName);
						$arrLanguageData = $languageProperties->loadProperties();
						if (!empty ($languageSort)) {
							$langFlag = $languageLeval . $languageSort;
							if (!empty ($languageCountry)) {
								$langFlag .= '_' . $languageCountry;
							} else {
							}
						} else {
							$langFlag = $languageLeval;
						}
						$objAction->addLanguagePack(array (
							$langFlag => $arrLanguageData
						));
					}
				}
				if (!$languageFileExit) {
					throw new FileLoadException(DISK_ROOT . $globalLanguagePackPath . $globalLanguagePack['name'] . '.lgp');
				}
			}
		}
		//载入分级别的国际化信息 分为两类 ：类级别，包级别
		$arrLanguagePacks = Util :: traversalDir($languagePacksPath);
		foreach ($arrLanguagePacks as $languagePack) {
			$languagePackName = $languagePack;
			if (Util :: strEndWith($languagePack, '.lgp')) {
				$languagePack = substr($languagePack, 0, -4);
				$languageLeval = '';
				$languageSort = '';
				$languageCountry = '';
				if (Util :: strStartWith($languagePack, $className)) {
					$languageLeval = 'class_';
					$arrTemp = explode('_', $languagePack);
					if (count($arrTemp) == 2) {
						$languageSort = $arrTemp[1];
					}
					elseif (count($arrTemp) == 3) {
						$languageSort = $arrTemp[1];
						$languageCountry = $arrTemp[2];
					} else {
					}
				}
				elseif (Util :: strStartWith($languagePack, 'package')) {
					$languageLeval = 'package_';
					$arrTemp = explode('_', $languagePack);
					if (count($arrTemp) == 2) {
						$languageSort = $arrTemp[1];
					} else
						if (count($arrTemp) == 3) {
							$languageSort = $arrTemp[1];
							$languageCountry = $arrTemp[2];
						} else {
						}
				}
				if (!empty ($languageLeval)) {
					$languageProperties = new Properties($languagePacksPath . '/' . $languagePackName);
					$arrLanguageData = $languageProperties->loadProperties();
					if (!empty ($languageSort)) {
						$langFlag = $languageLeval . $languageSort;
						if (!empty ($languageCountry)) {
							$langFlag .= '_' . $languageCountry;
						} else {
						}
					} else {
						$langFlag = $languageLeval;
					}
					$objAction->addLanguagePack(array (
						$langFlag => $arrLanguageData
					));
				} else {

				}

			}
		}
		//加入按照一般请求方式提交来的数据
		if ($_SERVER['REQUEST_METHOD'] == GET) {
			$arrData += $_GET;
		} else {
			$arrData += $_POST;
		}
		//将请求数据自动赋值到相应的action属性中  Action需提供setXXX()方法
		foreach ($arrData as $key => $value) {
			$attrFunctionName = strval('set' . ucfirst($key));
			$objAction-> $attrFunctionName ($value);
		}

		if ($preAction != null) {
			//加入上一个action传递的数据
			$objAction->addChainData($preAction->getChainData());
		} else {
		}
		$functionName = strval($functionName);
		//执行相应的拦截器
		$actionIntercepters = $action->intercepterRef;
		$intercepterExit = false;
		if (!empty ($actionIntercepters)) {
			$arrObjIntercepters = array ();
			$intercepterFlag = false;
			foreach ($actionIntercepters as $actionIntercepter) {
				$intercepterName = $actionIntercepter["name"];
				if (empty ($intercepterName)) {
					continue;
				}
				foreach ($arrIntercepters as $intercepter) {
					if (trim($intercepterName) == trim($intercepter["name"])) {
						$intercepterExit = true;
						$intercepterPhpPath = $intercepter["php"];
						$arrPhpPath = explode("/", $intercepterPhpPath);
						$intercepterPhpName = $arrPhpPath[count($arrPhpPath) - 1];
						$intercepterClassName = $intercepter["class"];
						if (empty ($intercepterClassName)) {
							$intercepterClassName = $intercepterPhpName;
						}
						$intercepterPhpPath = DISK_ROOT . $intercepterPhpPath . ".php";
						if (file_exists($intercepterPhpPath)) {
							@ require_once ($intercepterPhpPath);

						} else {
							throw new PhpIncludeException($intercepterPhpPath);
						}

						$intercepterClassName = strval($intercepterClassName);

						if (class_exists($intercepterClassName)) {
							$objIntercepter = @ new $intercepterClassName ();

						} else {
							throw new ClassLoadException($intercepterPhpPath . '------->' . $intercepterClassName);
						}

						$arrObjIntercepters[] = $objIntercepter;
						$invokeResult = $objIntercepter->beforeDoAction(& $objAction, $arrData);
						if (empty ($invokeResult) || $invokeResult === false) {
							continue;
						} else {
							$intercepterFlag = true;
							$resultName = $invokeResult;
							break;
						}

					}
				}
				if (!$intercepterExit) {
					throw new IntercepterPathException($intercepterName);
				}

			}
			if ($intercepterExit && !$intercepterFlag) {

				if (!empty ($action->validater)) {

					foreach ($action->validater as $validateXML) {
						$this->validateByXML($validateXML, $arrCustomerConfig, $objAction, $arrData);
					}

				}

				if ($functionName == 'index') {
					$validateFunctionName = 'validate';
				} else {
					$validateFunctionName = 'validate' . ucfirst($functionName);
				}
				$objAction-> $validateFunctionName ();
				if ($objAction->hasErrMsg()) {
					$resultName = 'validateError';
				} else {
					$resultName = $objAction-> $functionName ();
				}
				foreach ($arrObjIntercepters as $objIntercepters) {
					$invokeResult = $objIntercepter->afterDoAction(& $objAction, $arrData, $invokeResult);
					if (empty ($invokeResult) || $invokeResult === false) {

						continue;
					} else {
						$resultName = $invokeResult;
						break;
					}
				}
			}

		} else {

			if (!empty ($action->validater)) {

				foreach ($action->validater as $validateXML) {
					$this->validateByXML($validateXML, $arrCustomerConfig, $objAction, $arrData);
				}

			}
			if ($functionName == 'index') {
				$validateFunctionName = 'validate';
			} else {
				$validateFunctionName = 'validate' . ucfirst($functionName);
			}
			$objAction-> $validateFunctionName ();
			if ($objAction->hasErrMsg()) {
				$resultName = 'validateError';
			} else {
				$resultName = $objAction-> $functionName ();
			}

		}
		$result = NULL;

		foreach ($action->result as $baseResult) {
$resultName=trim($resultName);
			if (trim($baseResult["name"],"\n\t") ==$resultName) {
				$result = $baseResult;
				break;
			} else {
			}
		}
		if ($result == null) {
			throw new ResultException($resultName);
		}
		$arrResultParams = array ();
		$arrResultParams['value'] = trim(strval($result),"\n\t");
		$arrResultParams['currentPackage'] = strval($packageName);
		foreach ($result->attributes() as $key => $value) {
			$arrResultParams[$key] = strval($value);
		}
		$resultType = $result["type"];
		$resultValue = $result;
		if (empty ($resultType)) {
			$resultType = "dispatcher";
		} else {
		}

		$arrResultTypes = array ();
		foreach ($arrCustomerConfig as $customerConfig) {
			if (!empty ($customerConfig->resultTypes->registResultType)) {
				foreach ($customerConfig->resultTypes->registResultType as $registResultType) {
					$arrResultTypes[] = $registResultType;
				}

			}

		}
		foreach ($arrResultTypes as $registResultType) {
			if (trim($registResultType['name']) == trim($resultType)) {
				$resultPhpPath = $registResultType['php'];
				$arrResultPhpPath = explode("/", $resultPhpPath);
				$resultPhpName = $arrResultPhpPath[count($arrResultPhpPath) - 1];
				$className = $registResultType["class"];
				if (empty ($className)) {
					$className = $resultPhpName;
				}
				$className = strval($className);
				$resultPhpPath = DISK_ROOT . $resultPhpPath . ".php";

				if (file_exists($resultPhpPath)) {
					@ require_once ($resultPhpPath);

				} else {
					throw new PhpIncludeException($resultPhpPath);
				}
				$resultTypeClassName = strval($registResultType['class']);

				if (class_exists($resultTypeClassName)) {
					$result = @ new $resultTypeClassName ();

				} else {
					throw new ClassLoadException($resultPhpPath . '------->' . $resultTypeClassName);
				}

				$result->doResult($objAction, $arrResultParams, $arrData, $this);
				break;
			}
		}

	}

	/**
	 *validateByXML             xml校验
	 *$validateXML               xml配置文件
	 *$arrCustomerConfig   用户自定义的设置
	 *$objAction					 目标action
	 *$arrData						 请求数据
	 *
	 */
	public function validateByXML($validateXML, $arrCustomerConfig, $objAction, $arrData) {
		$arrValidateXMLs[] = $validateXML;
		$validateXMLPath = strval($validateXML['xml']) . '.xml';
		$validateXMLPath = DISK_ROOT . $validateXMLPath;
		if (file_exists($validateXMLPath)) {
			$objValidateXML = @ simplexml_load_file($validateXMLPath);
			if (!empty ($objValidateXML->validater)) {
				$arrValidateResult = array ();
				foreach ($objValidateXML->validater as $validater) {
					$validateType = trim(strval($validater['type']));
					if ($validateType == 'field') {
						if (!empty ($validater->field)) {
							foreach ($validater->field as $field) {
								$fieldName = strval($field['name']);
								$attrFunctionName = strval('get' . ucfirst($fieldName));
								$fieldValue = $objAction-> $attrFunctionName ();

								if (!empty ($field->checker)) {
									foreach ($field->checker as $checker) {
										$checkerName = strval($checker['name']);
										$arrParams = array ();
										if (!empty ($checker->param)) {
											foreach ($checker->param as $param) {
												$arrParams[strval($param['name'])] = strval($param);
											}
										}

										$arrValidateCheckers = array ();
										foreach ($arrCustomerConfig as $customerConfig) {
											if (empty ($customerConfig->validateCheckers)) {

												continue;
											}
											foreach ($customerConfig->validateCheckers->registChecker as $registChecker) {
												$arrValidateCheckers[] = $registChecker;

												if (trim($registChecker['name']) == trim($checkerName)) {

													$XMLPremisses = $checker->premiss;
													$premissValidateResult = true;
													if (!empty ($XMLPremisses)) {
														foreach ($XMLPremisses as $XMLPremiss) {
															$premissField = strval($XMLPremiss['field']);
															$premissChecker = strval($XMLPremiss['checker']);

															$validateKey = $premissField . '_' . $premissChecker;
															if (array_key_exists($validateKey, $arrValidateResult)) {

																$premissValidateResult = $arrValidateResult[$validateKey];
															} else {
																//exceptoin  前提条件不存在
																throw new XMLPrermissValidateException(array($checkerName.'_'.$fieldName,$validateKey));
															}

														}

													}

													if ($premissValidateResult == false) {

														break;
													}

													$validateCheckerPhpPath = $registChecker['php'];
													$arrValidateCheckerPhpPath = explode("/", $validateCheckerPhpPath);
													$validateCheckerPhpName = $arrValidateCheckerPhpPath[count($arrValidateCheckerPhpPath) - 1];
													$validateCheckerClassName = $registChecker["class"];
													if (empty ($validateCheckerClassName)) {
														$validateCheckerClassName = $validateCheckerPhpName;
													}
													$validateCheckerClassName = strval($validateCheckerClassName);
													$validateCheckerPhpPath = DISK_ROOT . $validateCheckerPhpPath . ".php";
													if (file_exists($validateCheckerPhpPath)) {
														@ require_once ($validateCheckerPhpPath);

													} else {

														throw new PhpIncludeException($validateCheckerPhpPath);
													}

													if (class_exists($validateCheckerClassName)) {

														$validateChecker = @ new $validateCheckerClassName ();
														$checkResult = $validateChecker->check($fieldName, $fieldValue, $arrParams, $arrData);
														$validateKey = $fieldName . '_' . $checkerName;
														$arrValidateResult[$validateKey] = $checkResult;
														if ($checkResult === false) {
															$errMsg = '';

															if (empty ($checker->errMsg)) {
																$xmlErrMsg = $field->errMsg;
															} else {
																$xmlErrMsg = $checker->errMsg;
															}

															$errMsgKey = strval($xmlErrMsg['key']);
															if (empty ($errMsgKey)) {
																$errMsg = strval($xmlErrMsg);
															} else {
																$arrMsgParams = array ();
																if (!empty ($xmlErrMsg->placeHolder)) {
																	foreach ($xmlErrMsg->placeHolder as $placeHolder) {
																		if (!empty ($placeHolder['key'])) {
																			$arrMsgParams[] = $objAction->getText(strval($placeHolder['key']));
																		} else {
																			$arrMsgParams[] = strval($placeHolder);
																		}

																	}
																}
																$errMsg = $objAction->getText($errMsgKey, $arrMsgParams);
															}

															$objAction->addErrMsg($fieldName, $errMsg);
														}
													} else {
														throw new ClassLoadException($validateCheckerPhpPath . '------->' . $validateCheckerClassName);
													}

													break;
												}

											}
										}
									}
								}
							}

						}

					}

					elseif (trim($validateType) == 'checker') {

						if (!empty ($validater->checker)) {

							foreach ($validater->checker as $checker) {

								$checkerName = strval($checker['name']);
								$arrParams = array ();
								if (!empty ($checker->param)) {
									foreach ($checker->param as $param) {
										$arrParams[strval($param['name'])] = strval($param);
									}
								}

								$arrValidateCheckers = array ();
								foreach ($arrCustomerConfig as $customerConfig) {
									if (empty ($customerConfig->validateCheckers)) {
										continue;
									}
									foreach ($customerConfig->validateCheckers->registChecker as $registChecker) {
										$arrValidateCheckers[] = $registChecker;

										if (trim($registChecker['name']) == trim($checkerName)) {
											$XMLPremisses = $checker->premiss;
											$premissValidateResult = true;
											if (!empty ($XMLPremisses)) {
												foreach ($XMLPremisses as $XMLPremiss) {

													$premissField = strval($XMLPremiss['field']);
													$premissChecker = strval($XMLPremiss['checker']);

													$validateKey = $premissField . '_' . $premissChecker;
													if (array_key_exists($validateKey, $arrValidateResult)) {

														$premissValidateResult = $arrValidateResult[$validateKey];
													} else {
														//exceptoin  前提条件不存在
														throw new XMLPrermissValidateException(array($checkerName,$validateKey));
													}

												}

											}

											if ($premissValidateResult == false) {
												break;
											}
											$validateCheckerPhpPath = $registChecker['php'];
											$arrValidateCheckerPhpPath = explode("/", $validateCheckerPhpPath);
											$validateCheckerPhpName = $arrValidateCheckerPhpPath[count($arrValidateCheckerPhpPath) - 1];
											$validateCheckerClassName = $registChecker["class"];
											if (empty ($validateCheckerClassName)) {
												$validateCheckerClassName = $validateCheckerPhpName;
											}
											$validateCheckerClassName = strval($validateCheckerClassName);
											$validateCheckerPhpPath = DISK_ROOT . $validateCheckerPhpPath . ".php";

											if (file_exists($validateCheckerPhpPath)) {
												@ require_once ($validateCheckerPhpPath);

											} else {
												throw new PhpIncludeException($validateCheckerPhpPath);
											}

											if (class_exists($validateCheckerClassName)) {
												$validateChecker = @ new $validateCheckerClassName ();

												if (!empty ($checker->field)) {
													foreach ($checker->field as $field) {

														$fieldName = strval($field['name']);
														$attrFunctionName = strval('get' . ucfirst($fieldName));
														$fieldValue = $objAction-> $attrFunctionName ();

														$checkResult = $validateChecker->check($fieldName, $fieldValue, $arrParams, $arrData);

														$validateKey = $fieldName . '_' . $checkerName;
														$arrValidateResult[$validateKey] = $checkResult;
														if ($checkResult === false) {

															$errMsg = '';
															if (empty ($field->errMsg)) {
																$xmlErrMsg = $checker->errMsg;
															} else {
																$xmlErrMsg = $field->errMsg;
															}
															$errMsgKey = strval($xmlErrMsg['key']);
															if (empty ($errMsgKey)) {
																$errMsg = strval($xmlErrMsg);
															} else {
																$arrMsgParams = array ();
																if (!empty ($xmlErrMsg->placeHolder)) {
																	foreach ($xmlErrMsg->placeHolder as $placeHolder) {
																		if (!empty ($placeHolder['key'])) {
																			$arrMsgParams[] = $objAction->getText(strval($placeHolder['key']));
																		} else {
																			$arrMsgParams[] = strval($placeHolder);
																		}

																	}
																}
															}

															$objAction->addErrMsg($fieldName, $errMsg);
														}

													}
												}

											} else {
												throw new ClassLoadException($validateCheckerPhpPath . '------->' . $validateCheckerClassName);
											}

											break;
										}

									}
								}

							}

						}

					}

				}
			}

		} else {
			throw new FileLoadException($validateXMLPath);
		}

	}

}