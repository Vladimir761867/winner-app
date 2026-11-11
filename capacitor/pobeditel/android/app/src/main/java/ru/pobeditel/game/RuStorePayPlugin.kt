package ru.pobeditel.game

import android.content.Intent
import com.getcapacitor.JSArray
import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin
import ru.rustore.sdk.pay.RuStorePayClient
import ru.rustore.sdk.pay.model.*

/** Мост между игрой (JS) и платежами RuStore Pay SDK. Товары — разовые (non-consumable). */
@CapacitorPlugin(name = "RuStorePay")
class RuStorePayPlugin : Plugin() {

    override fun load() {
        proceed(activity?.intent)
    }

    override fun handleOnNewIntent(intent: Intent?) {
        super.handleOnNewIntent(intent)
        proceed(intent)
    }

    private fun proceed(intent: Intent?) {
        try {
            if (intent != null) RuStorePayClient.instance.getIntentInteractor().proceedIntent(intent)
        } catch (e: Throwable) {
        }
    }

    @PluginMethod
    fun getProducts(call: PluginCall) {
        val ids = try { call.getArray("ids")?.toList<String>() ?: emptyList() } catch (e: Throwable) { emptyList() }
        RuStorePayClient.instance.getProductInteractor()
            .getProducts(productsId = ids.map { ProductId(it) })
            .addOnSuccessListener { products ->
                val arr = JSArray()
                products.forEach { p ->
                    val o = JSObject()
                    o.put("id", p.productId.value)
                    o.put("price", p.amountLabel.value)
                    o.put("title", p.title.value)
                    arr.put(o)
                }
                call.resolve(JSObject().put("products", arr))
            }
            .addOnFailureListener { e -> call.reject(e.message ?: "getProducts failed") }
    }

    @PluginMethod
    fun getPurchases(call: PluginCall) {
        RuStorePayClient.instance.getPurchaseInteractor()
            .getPurchases()
            .addOnSuccessListener { list ->
                val arr = JSArray()
                list.forEach { p ->
                    if (p is ProductPurchase) {
                        val s = p.status.toString()
                        if (s == "PAID" || s == "CONFIRMED") arr.put(p.productId.value)
                    }
                }
                call.resolve(JSObject().put("ids", arr))
            }
            .addOnFailureListener { e -> call.reject(e.message ?: "getPurchases failed") }
    }

    @PluginMethod
    fun purchase(call: PluginCall) {
        val id = call.getString("id")
        if (id == null) {
            call.reject("no id")
            return
        }
        val params = ProductPurchaseParams(
            productId = ProductId(id),
            orderId = null,
            quantity = null,
            developerPayload = null,
            appUserId = null,
            appUserEmail = null,
        )
        RuStorePayClient.instance.getPurchaseInteractor()
            .purchase(params = params, preferredPurchaseType = PreferredPurchaseType.ONE_STEP)
            .addOnSuccessListener { r -> call.resolve(JSObject().put("id", r.productId.value)) }
            .addOnFailureListener { e -> call.reject(e.message ?: "purchase failed") }
    }
}
