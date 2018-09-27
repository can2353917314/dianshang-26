$(function () { 

// 1.进行表单校验配置
  // 效验要求：1.用户名不能为空，长度为2-6位
          //  2.密码不能为空,长度为6-12位
  /**
   * 实现表单效验功能,进行表单校验初始化
   *
   * */
  $("#form").bootstrapValidator({
// 指定效验时显示的图标，固定写法
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',//bootstrap的字体图标类名
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },



    fields: {//配置的效验字段
    username: {
      // 配置校验规则,不要少了s 
      validators: {
        // 非空效验
        notEmpty: {
          // 提示信息
          message: "用户名不能为空"
        },
        // 长度效验
        stringLength: {
          min: 2,
          max: 6,
          message: "用户名长度必须是2-6位"
        },
        callback: {
          message: "用户名不存在"
        }
      }
    },
    password: {
      validators: {//效验规则
        notEmpty: {//非空效验
          //提示信息
          message: "密码不能为空"
        },
        // 长度效验
        stringLength: {
          min: 6,
          max: 12,
          message: "密码的长度必须是6-12位"
        },
        callback: {//用于回调的提示说明
          message: "密码错误"
        }
      }
    }

    }
  });

/*2.通过submit 按钮进行提交表单，可以让表单效验插件进行效验
1.效验通过，默认将表单继续提交，会跳转页面，需要在效验通过后，阻止默认的提交，通过ajax进行进行登陆请求
2.效验失败，表单效验插件本身就会阻止默认的提交
  思路： 注册表单效验成功事件，阻止默认的表单提交，通过ajax进行提交

*/ 
  
  $('#form').on('success.form.bv', function (e) { 
  
    e.preventDefault();//阻止默认的表单提交
  // console.log("阻止默认的表单提交");
// 通过ajax进行提交
    $.ajax({
      type: 'post',
      url: '/employee/employeeLogin',
      data: $("#form").serialize(),
      dataType: "jsonn",
      success: function (info) { 
        if (info.success) { 
        // 登陆成功，跳转到首页
          location.href = "index.html";
         
        }
        if (info.error === 1001) {
          alert("密码错误")
          //更新字段的状态
          $('#form').data('bootstrapValidator').updateStatus("password", "INVALID", "callback")

        }
      }



    })
    // 3.添加重置功能 
    $('[type= "reset"]').click(function () { 
// 调用插件的方法，进行重置
      $('#form').data('bootstrapValidator').resetForm();


    });



  })






















});